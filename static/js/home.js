document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("slider-media");
    if (!container || !window.sliderItems) return;

    let current = 0;

    function showSlide(index) {
        container.innerHTML = "";
        const item = window.sliderItems[index];

        if (item.type === "image") {
            const img = document.createElement("img");
            img.src = item.src;
            img.style.width = "100%";
            img.style.height = "600px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "20px";
            container.appendChild(img);

            setTimeout(nextSlide, item.duration || 3000);
        }

        if (item.type === "video") {
            const video = document.createElement("video");
            video.src = item.src;
            video.autoplay = true;
            video.muted = true;   // обязательно для autoplay
            video.playsInline = true;
            video.style.width = "100%";
            video.style.height = "600px";
            video.style.objectFit = "cover";
            video.style.borderRadius = "20px";

            container.appendChild(video);

            video.onended = nextSlide;
        }
    }

    function nextSlide() {
        const currentElement = container.firstChild;

        if (currentElement) {
            currentElement.style.opacity = 0;

            setTimeout(() => {
                current = (current + 1) % window.sliderItems.length;
                showSlide(current);
            }, 200); // совпадает с transition
        } else {
            current = (current + 1) % window.sliderItems.length;
            showSlide(current);
        }
    }

    showSlide(current);
});