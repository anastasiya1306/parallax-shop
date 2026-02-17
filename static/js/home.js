document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("slider-image");
    if (!slider || !window.sliderImages) return;

    let current = 0;

    setInterval(() => {
        current = (current + 1) % sliderImages.length;
        slider.src = sliderImages[current];
    }, 7000);
});