document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("slider-track");
    const dotsContainer = document.getElementById("slider-dots");

    if (!track || !window.sliderItems || !window.sliderItems.length) {
        return;
    }

    const items = window.sliderItems;

    let current = 0;
    let timer = null;

    /* =========================================
       Создаём слайды
       ========================================= */

    items.forEach(function (item) {

        const slide = document.createElement("div");

        slide.classList.add("slider-slide");

        if (item.type === "image") {

            const img = document.createElement("img");

            img.src = item.src;
            img.alt = "";

            slide.appendChild(img);
        }

        if (item.type === "video") {

            const video = document.createElement("video");

            video.src = item.src;

            video.muted = true;
            video.playsInline = true;

            slide.appendChild(video);
        }

        track.appendChild(slide);
    });

    const slides = Array.from(
        track.querySelectorAll(".slider-slide")
    );

    /* =========================================
       Создаём точки
       ========================================= */

    items.forEach(function (_, index) {

        const dot = document.createElement("button");

        dot.type = "button";

        dot.classList.add("slider-dot");

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", function () {

            showSlide(index);

        });

        dotsContainer.appendChild(dot);

    });

    const dots = Array.from(
        dotsContainer.querySelectorAll(".slider-dot")
    );

    /* =========================================
       Показываем слайд
       ========================================= */

    function showSlide(index) {

        current = index;

        /*
         * Каждый слайд занимает 100% ширины,
         * поэтому просто двигаем ленту.
         */

        track.style.transform =
            `translateX(-${current * 100}%)`;

        /* Обновляем точки */

        dots.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === current
            );

        });

        /* Останавливаем все видео */

        slides.forEach(function (slide) {

            const video =
                slide.querySelector("video");

            if (video) {
                video.pause();
            }

        });

        /* Если текущий слайд — видео */

        const currentVideo =
            slides[current].querySelector("video");

        if (currentVideo) {

            currentVideo.currentTime = 0;

            currentVideo.play().catch(function () {
                // Браузер заблокировал autoplay
            });

            currentVideo.onended = function () {

                nextSlide();

            };

        } else {

            /*
             * Картинка показывается заданное время
             */

            clearTimeout(timer);

            const duration =
                items[current].duration || 7000;

            timer = setTimeout(function () {

                nextSlide();

            }, duration);

        }

    }

    /* =========================================
       Следующий слайд
       ========================================= */

    function nextSlide() {

        clearTimeout(timer);

        const next =
            (current + 1) % items.length;

        showSlide(next);

    }

    /* =========================================
       Запускаем
       ========================================= */

    showSlide(0);

});