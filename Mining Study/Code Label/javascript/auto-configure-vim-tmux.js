// --------------------------------------------------------------------------
// -- auto-configure-vim-tmux.js
// --------------------------------------------------------------------------
//Helped by Github Copilot
//Helped by BardAI

const fs = require('fs');

// let link = "https://renickbell.net/vim/.vimrc"
async function fetchText(link) {
   let response = await fetch(link);
   let text = await response.text();
   return text;
}
// let vimrc = await fetchText(link);
// //generated by BardAI: https://g.co/bard/share/8fab0ab55061
// //Modified by Steve
//
let homePath = process.env.HOME
// //helped by BardAI
//
// if (
// if (fs.existsSync(homePath + '.vimrc')
//     //helped by BardAI
//
//Write a function that detects current operating system.
function detectOS() {
  let os = process.platform;
  return os;
}

async function createVimrcUnix() {
    let vimrc = await fetchText("https://renickbell.net/vim/.vimrc")
    fs.writeFileSync(homePath + '/.vimrc', vimrc);
}

async function createVimrcWindows() {
    let vimrc = await fetchText("https://renickbell.net/vim/.vimrc")
    fs.writeFileSync(homePath + '/_vimrc', vimrc);
}

function addTmuxConfig(vimrcPath) {
    let contents = fs.readFileSync(vimrcPath, 'utf8');
    contents += '\n"--------------------------'
    contents += '\n"tmux config\n'
    if (contents.includes('map <F3>') === false){
        contents += '\nmap <F3> :call Tmux_Vars()<CR>'
        console.log('Tmux_Vars() binded to <F3> added to vimrc')
    }
    if (contents.includes('map <F8>') === false){
        contents += '\nmap <F8> V"by:call Send_to_Tmux(@b)<CR>'
        console.log('Send_to_Tmux() binded to <F8> added to vimrc')
    }
    if (contents.includes('map <F9>') === false && contents.includes('map <F10>') === false){
        contents += '\nmap <F10> vip'
        contents += '\nmap <F9> <F10><CR>'
        console.log('vip binded to <F10> and <F9> added to vimrc')
    }
    if (contents.includes('map <F11>') === false){
        contents += '\nmap <F11> :call Send_to_Tmux(":{\n")<CR>vip:normal @g<CR>:call Send_to_Tmux(":}\n")<CR>k'
        console.log('Send_to_Tmux binded to <F10> and <F9> added to vimrc')
    }
    if (contents.includes('map <F12>') === false){
        contents += '\nmap <F12> :call Send_to_Tmux("withSC3 Sound.SC3.ID.reset\n")<CR>'
        console.log('withSC3 Sound.SC3.ID.reset binded to <F12> added to vimrc')
    }
    if (contents.includes('map \-') === false){
        contents += '\nmap \- :call Send_to_Tmux(":{\n")<CR>vip:normal @g<CR>:call Send_to_Tmux(":}\n")<CR>k'
        console.log('Send_to_Tmux() binded to \- added to vimrc')
    }
    if (contents.includes('map \;') === false){
        contents += '\nmap \; :call Send_to_Tmux(":{\n")<CR>vip:normal @g<CR>:call Send_to_Tmux(":}\n")<CR>k'
        console.log('Send_to_Tmux() binded to \; added to vimrc')
    }
    if (contents.includes('map <CR>') === false){
        contents += '\nmap <CR> V"by:call Send_to_Tmux(@b)<CR>'
        console.log('Send_to_Tmux() binded to <CR> added to vimrc')
    }
    if (contents.includes('vmap \<CR\>') === false){
        contents += 'vmap <CR> "by:call Send_to_Tmux(@b)<CR>'
        console.log('Send_to_Tmux() vmap to <CR> added to vimrc')
    }
    fs.writeFileSync(vimrcPath, contents);
}

function findVimrcOnUnix() {
    let homePath = process.env.HOME;
    if (fs.existsSync(homePath + '/.vimrc') === false && fs.existsSync(homePath + '/.vim/vimrc') === false) {
        console.log('vimrc not found')
        createVimrcUnix()
        return true
    }
    else if (fs.existsSync(homePath + '/.vimrc')){
        console.log('Checking if add tmux conf to vimrc')
        addTmuxConfig(homePath + '/.vimrc')
    }
    else if (fs.existsSync(homePath + '/.vim/vimrc')){
        console.log('Checking if add tmux conf to vimrc')
        addTmuxConfig(homePath + '/.vimrc')
    }
    else if (fs.existsSync(homePath + '/.vim/vimrc')){
        addTmuxConfig(homePath + '/.vim/vimrc')
    }
    return false
}

function findVimrcOnWindows() {
    let homePath = process.env.HOME;
    if (fs.existsSync(homePath + '/_vimrc') === false || fs.existsSync(homePath + '/vimfiles/vimrc') === false){
        console.log('vimrc found')
        createVimrcWindows()
        return true
    }
    else if (fs.existsSync(homePath + '/_vimrc')){
        console.log('Checking if add tmux conf to vimrc')
        addTmuxConfig(homePath + '/_vimrc')
    }
    else if (fs.existsSync(homePath + '/vimfiles/vimrc')){
        console.log('Checking if add tmux conf to vimrc')
        addTmuxConfig(homePath + '/vimfiles/vimrc')
    }
    return false
}

//vimrc locations: https://stackoverflow.com/a/60932757/19515980

async function createTslimeUnix() {
    let tslime = await fetchText("https://renickbell.net/vim/plugin/tslime.vim")
    //Check if the .vim directory exists if it does not create it in the homepath:
    if (fs.existsSync(homePath + '/.vim') === false){
        fs.mkdirSync(homePath + '/.vim')
        console.log('.vim directory created')
    }
    //check if the plugin directory exists if it does not create it in the .vim directory:
    if (fs.existsSync(homePath + '/.vim/plugin') === false){
        fs.mkdirSync(homePath + '/.vim/plugin')
        console.log('.vim/plugin directory created')
    }
    fs.writeFileSync(homePath + '/.vim/plugin/tslime.vim', tslime);
    console.log('tslime.vim created for Unix')
}

async function createTslimeWindows() {
    let vimrc = await fetchText("https://renickbell.net/vim/plugin/tslime.vim")
    //Check if the .vim directory exists if it does not create it in the homepath:
    if (fs.existsSync(homePath + '/vimfiles') === false){
        fs.mkdirSync(homePath + '/vimfiles')
        console.log('vimfiles directory created')
    }
    //check if the plugin directory exists if it does not create it in the .vim directory:
    if (fs.existsSync(homePath + '/vimfiles/plugin') === false){
        fs.mkdirSync(homePath + '/vimfiles/plugin')
        console.log('vimfiles/plugin directory created')
    }
    fs.writeFileSync(homePath + '/vimfiles/plugin/tslime.vim', vimrc);
    console.log('tslime.vim created for Windows')
}

function findTslimeOnUnix() {
    if (fs.existsSync(homePath + '/.vim/plugin/tslime.vim') === false){
        console.log('creating tslime for Unix')
        createTslimeUnix()
        return true
    }
    console.log('Tslime already exists')
    return false
}

function findTslimeOnWindows() {
    if (fs.existsSync(homePath + '/vimfiles/plugin/tslime.vim') === false){
        console.log('creating tslime for windows')
        createTslimeWindows()
        return true
    }
    console.log('Tslime already exists')
    return false
}
//https://superuser.com/questions/1391565/how-to-install-vim-plugin-in-windows-10

// function installSuperColliderPlugins() {

let platform = detectOS();

if (platform === 'linux' || platform === 'darwin'){
    findVimrcOnUnix();
    findTslimeOnUnix();
}
else if (platform === 'win32'){
    findVimrcOnWindows();
    findTslimeOnWindows();
}

if (platform === 'darwin'){
    installSuperColliderPlugins()
}

//Meaning of process.os(): https://stackoverflow.com/a/8684009/19515980
//VIM does not come witha .vimrc: https://g.co/bard/share/d3ace3c4963d