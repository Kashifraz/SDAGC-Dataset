const datesToRoman = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII',
  13: 'XIII',
  14: 'XIV',
  15: 'XV',
  16: 'XVI',
  17: 'XVII',
  18: 'XVIII',
  19: 'XIX',
  20: 'XX',
  21: 'XXI',
  22: 'XXII',
  23: 'XXIII',
  24: 'XXIV',
  25: 'XXV',
  26: 'XXVI',
  27: 'XXVII',
  28: 'XXVIII',
  29: 'XXIX',
  30: 'XXX',
  31: 'XXXI'
};

const $ = (path) => {
  return document.querySelector(path);
};

const $$ = (path) => {
  return document.querySelectorAll(path);
};

const setQuote = async () => {
  try {
    const storage = await browser.storage.local.get(),
      wikipediaBaseUrl = 'https://en.wikipedia.org/wiki/Special:Search';

    // https://practicaltypography.com/straight-and-curly-quotes.html
    $('.quote').textContent = `“${!!storage.quote ? storage.quote : ''}”`;
    $('.author').textContent = `- ${!!storage.author ? storage.author : ''}`;
    $('.author').href = `${wikipediaBaseUrl}/${encodeURI(storage.author)}`;
  } catch (e) {
    console.error(e);
  }
};

const getYearProgressText = () => {
  const currentYear = new Date().getFullYear();

  // generated by github copilot, i didn't write this
  const yearCompletePercent = Math.floor((new Date() - new Date(currentYear, 0, 0)) / (1000 * 60 * 60 * 24) / 365 * 100);
  return `${currentYear} is ${yearCompletePercent}% complete`;
}

const setDate = () => {
  $('.roman-date-text').textContent = datesToRoman[new Date().getDate()];
  $('.year-progress-text').textContent = getYearProgressText();
};

const storeQuote = async (data) => {
  if (!data) {
    return;
  }

  await browser.storage.local.set({
    quote: data.quote,
    author: data.author,
    fetchedAt: Date.now()
  });

  setQuote();
};

const fetchQuote = async () => {
  const storage = await browser.storage.local.get();
  const currentDay = Date.now();
  const timeout = 8 * 60 * 60 * 1000; // 8 hours in ms

  if (!storage.quote || currentDay - storage.fetchedAt > timeout) {
    fetch('https://api.muetab.com/quotes/random?language=English')
      .then((response) => response.json())
      .then((result) => {
        storeQuote(result);
      })
      .catch((error) => console.log('error', error));
    return;
  }

  setQuote();
};

const generateBookmarkItem = (bookmark) => {
  const linkTag = document.createElement('a');
  linkTag.classList.add('link');
  linkTag.href = bookmark.url;

  // Display only the first word of the bookmark to preserve aesthetics
  linkTag.innerText = bookmark.title.split(' ')[0];

  return linkTag;
};

const processBookmarks = (bookmarks) => {
  const bookmarksOne = bookmarks.slice(0, 4);

  if (!bookmarks.length) {
    $$('.link-column')[0].remove();
    $$('.link-column')[0].remove();
    $('.links').appendChild(document.createTextNode('no bookmarks found, choose a folder from options'));
    return;
  }

  const columnOne = $$('.link-column')[0];
  bookmarksOne.forEach((bookmark) => columnOne.appendChild(generateBookmarkItem(bookmark)));

  const bookmarksTwo = bookmarks.slice(4, 8);
  const columnTwo = $$('.link-column')[1];
  bookmarksTwo.forEach((bookmark) => columnTwo.appendChild(generateBookmarkItem(bookmark)));
};

/**
 * @description - The bookmarks tree might contain folders, we filter them out here
 * @param {Object} bookmarksTree
 */
const filterBookmarks = (bookmarksTree) => {
  return bookmarksTree.children.filter((bookmark) => Boolean(bookmark.url));
};

const getBookmarksFolder = async () => {
  const storage = await browser.storage.local.get();
  let bookmarksIdentifier, bookmarksTree;
  if (storage.chosenBookmarkFolder) {
    bookmarksIdentifier = storage.chosenBookmarkFolder;
  } else {
    // Name of the folder in chrome
    bookmarksIdentifier = 'Bookmarks Bar';

    // This function only exists in firefox
    if (browser.runtime.getBrowserInfo) {
      bookmarksIdentifier = 'Bookmarks Toolbar';
    }
  }

  const bookmarks = await browser.bookmarks.getTree();
  bookmarksTree = bookmarks[0].children.find((child) => child.title === bookmarksIdentifier);

  return filterBookmarks(bookmarksTree);
};

const fetchBookmarks = async () => {
  const bookmarksBar = await getBookmarksFolder();
  processBookmarks(bookmarksBar);
};

// Fetch quote
fetchQuote();

// Set roman date
setDate();

// fetch and set bookmarks
fetchBookmarks();

document.querySelector('#go-to-options').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});