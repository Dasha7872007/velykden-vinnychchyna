"use strict";

/* ========================================
   ВЕЛИКДЕНЬ НА ВІННИЧЧИНІ
   Інтерактивність сайту
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();
    initCarousels();
    initLightbox();

});

/* ========================================
   МОБІЛЬНЕ МЕНЮ
======================================== */

function initMobileMenu() {

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".nav");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.textContent = isOpen
            ? "✕ Закрити"
            : "☰ Меню";

    });

    // Закриваємо меню після вибору сторінки
    navigation.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰ Меню";

        });

    });

    // Закриваємо меню клавішею Escape
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰ Меню";

        }

    });

}

/* ========================================
   КАРУСЕЛІ ЗОБРАЖЕНЬ
======================================== */

function initCarousels() {

    const carousels = document.querySelectorAll(
        "[data-carousel]"
    );

    carousels.forEach(carousel => {

        const track = carousel.querySelector(
            ".carousel-track"
        );

        const previousButton = carousel.querySelector(
            '[data-dir="-1"]'
        );

        const nextButton = carousel.querySelector(
            '[data-dir="1"]'
        );

        if (!track) {
            return;
        }

        const slides = track.querySelectorAll(
            ".carousel-slide"
        );

        if (slides.length === 0) {
            return;
        }

        function moveCarousel(direction) {

            const firstSlide = slides[0];

            const slideWidth =
                firstSlide.getBoundingClientRect().width;

            const styles = window.getComputedStyle(track);

            const gap = parseFloat(styles.columnGap) || 0;

            const distance = slideWidth + gap;

            track.scrollBy({
                left: direction * distance,
                behavior: "smooth"
            });

        }

        if (previousButton) {

            previousButton.addEventListener("click", () => {
                moveCarousel(-1);
            });

        }

        if (nextButton) {

            nextButton.addEventListener("click", () => {
                moveCarousel(1);
            });

        }

    });

}

/* ========================================
   ЗБІЛЬШЕННЯ ЗОБРАЖЕНЬ
======================================== */

function initLightbox() {

    const lightbox = document.querySelector(".lightbox");

    if (!lightbox) {
        return;
    }

    const lightboxImage = lightbox.querySelector("img");

    const closeButton = lightbox.querySelector(
        ".lightbox-close"
    );

    const imageButtons = document.querySelectorAll(
        "[data-lightbox]"
    );

    if (!lightboxImage || !closeButton) {
        return;
    }

    let previousFocus = null;

    function openLightbox(image) {

        previousFocus = document.activeElement;

        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Великоднє зображення";

        lightbox.classList.add("open");

        document.body.style.overflow = "hidden";

        closeButton.focus();

    }

    function closeLightbox() {

        lightbox.classList.remove("open");

        lightboxImage.removeAttribute("src");

        document.body.style.overflow = "";

        if (previousFocus &&
            typeof previousFocus.focus === "function") {

            previousFocus.focus();

        }

    }

    // Відкриття зображення
    imageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const image = button.querySelector("img");

            if (image) {
                openLightbox(image);
            }

        });

    });

    // Закриття кнопкою
    closeButton.addEventListener(
        "click",
        closeLightbox
    );

    // Закриття при натисканні на темний фон
    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    // Закриття клавішею Escape
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            lightbox.classList.contains("open")
        ) {
            closeLightbox();
        }

    });

}
