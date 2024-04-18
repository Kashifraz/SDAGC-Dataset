// The code in this file is partially generated by GitHub Copilot

// Get the #onscreen-nav element
const onscreenNav = document.querySelector('#onscreen-nav');
// Initialize variables for tracking touch positions
let initialX = 0;
let initialY = 0;
let currentX = 0;
let currentY = 0;

// Function to handle touch start event
function handleTouchStart(event) {
    initialX = event.touches[0].clientX - currentX;
    initialY = event.touches[0].clientY - currentY;
}

// Function to handle touch move event
function handleTouchMove(event) {
    event.preventDefault();
    currentX = event.touches[0].clientX - initialX;
    currentY = event.touches[0].clientY - initialY;
    onscreenNav.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

// Add event listeners for touch events
onscreenNav.addEventListener('touchstart', handleTouchStart, false);
onscreenNav.addEventListener('touchmove', handleTouchMove, false);

window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    onscreenNav.style.transform = "";
    initialX = 0;
    initialY = 0;
    currentX = 0;
    currentY = 0;
})