
let target = 0;
let current = 0;
let ease = 0.075;

const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider-wrapper");
const markerWrapper = document.querySelector(".marker-wrapper");
const activeSlide = document.querySelector(".active-slide");

let maxScroll = sliderWrapper.offsetWidth - window.innerWidth;

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function updateActiveSliderNumber(markerMove, markerMaxMove) {
    const partWidth = markerMaxMove / 10;
    let currentPart = Math.ceil(markerMove / partWidth);
    currentPart = Math.max(1, currentPart);
    currentPart = Math.min(10, currentPart);
    activeSlide.textContent = `${currentPart}/10`;
}