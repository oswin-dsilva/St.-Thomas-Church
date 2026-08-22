/*=====================================================================
    ST. THOMAS CHURCH WEBSITE
    SCRIPT.JS

    FEATURES

    1. Preloader
    2. Sticky Header
    3. Mobile Hamburger Menu
    4. Smooth Scrolling
    5. Active Navigation
    6. Scroll Reveal Animations
    7. Gallery / Priest Lightbox
    8. Back To Top
======================================================================*/



/*=====================================================================
    1. PRELOADER
======================================================================*/

window.addEventListener("load", () => {

    const preloader =
        document.querySelector(".preloader");


    if (!preloader) {

        return;

    }


    preloader.style.opacity = "0";


    setTimeout(() => {

        preloader.style.display = "none";

    }, 500);

});



/*=====================================================================
    2. STICKY HEADER
======================================================================*/

const header =
    document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) {

        return;

    }


    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    }

    else {

        header.classList.remove("scrolled");

    }

});



/*=====================================================================
    3. MOBILE HAMBURGER MENU
======================================================================*/

const menuBtn =
    document.querySelector(".menu-btn");


const navbar =
    document.querySelector(".navbar");


if (menuBtn && navbar) {


    /*---------------------------------------------------------------
        OPEN / CLOSE MENU
    ----------------------------------------------------------------*/

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

        menuBtn.classList.toggle("open");


        const isOpen =
            navbar.classList.contains("active");


        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );


        /*-----------------------------------------------------------
            CHANGE HAMBURGER ICON TO X
        -----------------------------------------------------------*/

        const icon =
            menuBtn.querySelector("i");


        if (icon) {

            if (isOpen) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            }

            else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    });



    /*---------------------------------------------------------------
        CLOSE MENU AFTER LINK CLICK
    ----------------------------------------------------------------*/

    document
        .querySelectorAll(".navbar a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove(
                    "active"
                );

                menuBtn.classList.remove(
                    "open"
                );


                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                const icon =
                    menuBtn.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            });

        });

}



/*=====================================================================
    4. SMOOTH SCROLLING
======================================================================*/

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function(event) {

                const targetSelector =
                    this.getAttribute("href");


                if (
                    !targetSelector ||
                    targetSelector === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetSelector
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    });



/*=====================================================================
    5. ACTIVE DESKTOP NAVIGATION
======================================================================*/

const sections =
    document.querySelectorAll("section");


const navLinks =
    document.querySelectorAll(
        ".navbar a"
    );


function updateActiveNavigation() {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
                sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "current"
        );


        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add(
                "current"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


window.addEventListener(
    "load",
    updateActiveNavigation
);



/*=====================================================================
    6. SCROLL REVEAL ANIMATIONS
======================================================================*/

const revealItems =
    document.querySelectorAll(

        ".section-title, " +
        ".info-card, " +
        ".schedule-card, " +
        ".review-card, " +
        ".gallery-grid img, " +
        ".contact-grid > div"

    );



if (
    "IntersectionObserver" in window
) {


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("show");


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {

                threshold:0.15

            }

        );


    revealItems.forEach(item => {

        item.classList.add(
            "hidden"
        );

        observer.observe(item);

    });

}



/*=====================================================================
    7. CURRENT PRIESTS / IMAGE LIGHTBOX
======================================================================*/

const galleryImages =
    document.querySelectorAll(
        ".gallery-grid img"
    );


const lightbox =
    document.createElement("div");


lightbox.id =
    "lightbox";


document.body.appendChild(
    lightbox
);



/*---------------------------------------------------------------------
    OPEN LIGHTBOX
----------------------------------------------------------------------*/

galleryImages.forEach(image => {

    image.addEventListener(
        "click",
        () => {

            lightbox.classList.add(
                "active"
            );


            while (
                lightbox.firstChild
            ) {

                lightbox.removeChild(
                    lightbox.firstChild
                );

            }


            const enlargedImage =
                document.createElement(
                    "img"
                );


            enlargedImage.src =
                image.src;


            enlargedImage.alt =
                image.alt ||
                "Church photograph";


            lightbox.appendChild(
                enlargedImage
            );

        }
    );

});



/*---------------------------------------------------------------------
    CLOSE LIGHTBOX
----------------------------------------------------------------------*/

lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            lightbox.classList.remove(
                "active"
            );

        }

    }
);



/*---------------------------------------------------------------------
    CLOSE LIGHTBOX WITH ESC
----------------------------------------------------------------------*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            lightbox.classList.remove(
                "active"
            );

        }

    }
);



/*=====================================================================
    8. BACK TO TOP
======================================================================*/

const backTop =
    document.createElement("button");


backTop.className =
    "back-top";


backTop.type =
    "button";


backTop.setAttribute(
    "aria-label",
    "Back to top"
);


backTop.innerHTML =
    '<i class="fa-solid fa-arrow-up"></i>';


document.body.appendChild(
    backTop
);



/*---------------------------------------------------------------------
    SHOW / HIDE BUTTON
----------------------------------------------------------------------*/

window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 500
        ) {

            backTop.classList.add(
                "show"
            );

        }

        else {

            backTop.classList.remove(
                "show"
            );

        }

    }
);



/*---------------------------------------------------------------------
    SCROLL TO TOP
----------------------------------------------------------------------*/

backTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }
);