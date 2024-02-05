// Define initial variables
let target = 0;
let current = 0;
let ease = 0.075;

// Select DOM elements
const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider-wrapper");
const markerWrapper = document.querySelector(".marker-wrapper");
const activeSlide = document.querySelector(".active-slide");

// Calculate maximum scroll distance
let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

// Linear interpolation function
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Update active slider number based on marker position
function updateActiveSliderNumber(markerMove, markerMaxMove) {
    // Calculate the width of each part
    const partWidth = markerMaxMove / 10;
    // Determine the current part
    let currentPart = Math.ceil(markerMove / partWidth);
    // Ensure current part is within range
    currentPart = Math.max(1, currentPart);
    currentPart = Math.min(10, currentPart);
    // Update the active slide text content
    activeSlide.textContent = `${currentPart}/10`;
}

// Update function for animation
function update() {
    // Perform linear interpolation for smooth scrolling
    current = lerp(current, target, ease);

    // Update the position of the slider wrapper
    gsap.set(".slider-wrapper", {
        x: -current,
    });

    // Calculate the ratio of movement
    let moveRatio = current / maxScroll;

    // Calculate the maximum movement range for the marker
    let markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
    // Calculate the marker's position based on the movement ratio
    let markerMove = 70 + moveRatio * markerMaxMove;
    // Update the position of the marker
    gsap.set(".marker-wrapper", {
        x: markerMove,
    });

    // Update the active slider number based on the marker position
    updateActiveSliderNumber(markerMove, markerMaxMove);

    // Request animation frame for smooth updating
    requestAnimationFrame(update);
}

// Event listener for window resize to update maximum scroll distance
window.addEventListener("resize", () => {
    maxScroll = sliderWrapper.offsetWidth - window.innerWidth;
});

// Event listener for mouse wheel to update target scroll position
window.addEventListener("wheel", (e) => {
    // Update the target scroll position based on the wheel movement
    target += e.deltaY;
    // Ensure the target is within the valid range
    target = Math.max(0, target);
    target = Math.min(maxScroll, target);
});

// Initialize the update function
update();
