/* =========================================================
   NIRANJAN PORTFOLIO
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE MENU
    ===================================================== */

    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {
            mobileMenu.classList.toggle("active");
        });

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                mobileMenu.classList.remove("active");
            });

        });
    }


    /* =====================================================
       2. FADE-IN ANIMATION
    ===================================================== */

    const fadeElements = document.querySelectorAll(".fade-in");

    if ("IntersectionObserver" in window) {

        const fadeObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        fadeObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0,
                rootMargin: "50px"
            }
        );

        fadeElements.forEach(function (element) {
            fadeObserver.observe(element);
        });

    } else {

        fadeElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       3. MARQUEE SCROLL EFFECT
    ===================================================== */

    const marqueeSection = document.querySelector(".marquee-section");
    const marqueeRows = document.querySelectorAll(".marquee-row");

    function updateMarquee() {

        if (!marqueeSection || marqueeRows.length < 2) {
            return;
        }

        const sectionTop = marqueeSection.offsetTop;

        const scrollOffset =
            (window.scrollY - sectionTop + window.innerHeight) * 0.3;

        marqueeRows[0].style.transform =
            "translate3d(" + (scrollOffset - 200) + "px, 0, 0)";

        marqueeRows[1].style.transform =
            "translate3d(" + (-scrollOffset - 200) + "px, 0, 0)";
    }

    updateMarquee();

    window.addEventListener("scroll", updateMarquee, {
        passive: true
    });


    /* =====================================================
       4. ABOUT TEXT CHARACTER REVEAL
    ===================================================== */

    const aboutSection = document.querySelector(".about-section");
    const aboutText = document.querySelector(".about-text");

    if (aboutSection && aboutText) {

        const originalText = aboutText.textContent.trim();

        aboutText.innerHTML = "";

        const characters = originalText.split("");

        characters.forEach(function (character) {

            const span = document.createElement("span");

            if (character === " ") {
                span.innerHTML = "&nbsp;";
            } else {
                span.textContent = character;
            }

            span.style.opacity = "0.2";

            aboutText.appendChild(span);

        });


        const textSpans = aboutText.querySelectorAll("span");


        function updateAboutText() {

            const rect = aboutSection.getBoundingClientRect();

            const sectionHeight = aboutSection.offsetHeight;

            const viewportHeight = window.innerHeight;


            let progress =
                (viewportHeight * 0.8 - rect.top) /
                (sectionHeight * 0.6);


            progress = Math.max(0, Math.min(1, progress));


            textSpans.forEach(function (span, index) {

                const characterProgress =
                    index / textSpans.length;

                if (progress >= characterProgress) {

                    span.style.opacity = "1";

                } else {

                    span.style.opacity = "0.2";

                }

            });

        }


        updateAboutText();

        window.addEventListener("scroll", updateAboutText, {
            passive: true
        });

    }


    /* =====================================================
       5. PROJECT CARD STACK
    ===================================================== */

    const projectWrappers =
        document.querySelectorAll(".project-wrapper");


    function updateProjectStack() {

        if (projectWrappers.length === 0) {
            return;
        }


        const totalCards = projectWrappers.length;


        projectWrappers.forEach(function (wrapper, index) {

            const card =
                wrapper.querySelector(".project-card");


            if (!card) {
                return;
            }


            const rect =
                wrapper.getBoundingClientRect();


            const viewportHeight =
                window.innerHeight;


            let progress =
                (viewportHeight - rect.top) /
                (viewportHeight * 0.9);


            progress =
                Math.max(0, Math.min(1, progress));


            const targetScale =
                1 -
                (totalCards - 1 - index) * 0.03;


            const scale =
                1 -
                (1 - targetScale) * progress;


            card.style.transform =
                "scale(" + scale + ")";


            card.style.top =
                (24 + index * 28) + "px";

        });

    }


    updateProjectStack();


    window.addEventListener("scroll", updateProjectStack, {
        passive: true
    });


    window.addEventListener("resize", updateProjectStack);


    /* =====================================================
       6. MAGNETIC BUTTONS
    ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".contact-button, .live-button"
        );


    magneticButtons.forEach(function (button) {

        button.addEventListener("mousemove", function (event) {

            const rect =
                button.getBoundingClientRect();


            const centerX =
                rect.left + rect.width / 2;


            const centerY =
                rect.top + rect.height / 2;


            const distanceX =
                event.clientX - centerX;


            const distanceY =
                event.clientY - centerY;


            const padding = 150;


            if (
                Math.abs(distanceX) > padding ||
                Math.abs(distanceY) > padding
            ) {
                return;
            }


            const strength = 3;


            const moveX =
                distanceX / strength;


            const moveY =
                distanceY / strength;


            button.style.transition =
                "transform 0.3s ease-out";


            button.style.transform =
                "translate3d(" +
                moveX +
                "px, " +
                moveY +
                "px, 0)";

        });


        button.addEventListener("mouseleave", function () {

            button.style.transition =
                "transform 0.6s ease-in-out";


            button.style.transform =
                "translate3d(0, 0, 0)";

        });

    });


    /* =====================================================
       7. CURRENT YEAR
    ===================================================== */

    const yearElement =
        document.getElementById("current-year");


    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});