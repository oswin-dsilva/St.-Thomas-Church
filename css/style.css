/*=====================================================================
    ST. THOMAS CHURCH - MAIN JAVASCRIPT
======================================================================*/


/*=====================================================================
    1. DOM READY
======================================================================*/

document.addEventListener("DOMContentLoaded", function(){

    const header =
        document.querySelector(".header");

    const navbar =
        document.querySelector(".navbar");

    const menuBtn =
        document.querySelector(".menu-btn");

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(".hero-image");

    const schedule =
        document.querySelector(".schedule");


    /*=================================================================
        2. FORCE MOBILE MENU CLOSED
    =================================================================*/

    function closeMobileMenu(){

        document.body.classList.remove("menu-open");

        if(navbar){

            navbar.classList.remove("active");

        }

        if(menuBtn){

            menuBtn.classList.remove("open");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );


            const icon =
                menuBtn.querySelector("i");


            if(icon){

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    }


    closeMobileMenu();


    /*=================================================================
        3. HEADER SCROLL BEHAVIOUR
    =================================================================*/

    function handleHeaderScroll(){

        if(!header || !hero){

            return;

        }


        const heroBottom =
            hero.offsetTop +
            hero.offsetHeight;


        if(window.scrollY > 50){

            header.classList.add(
                "scrolled"
            );

        }else{

            header.classList.remove(
                "scrolled"
            );

        }


        if(
            window.scrollY >=
            heroBottom - 80
        ){

            header.classList.add(
                "nav-hidden"
            );

        }else{

            header.classList.remove(
                "nav-hidden"
            );

        }

    }


    /*=================================================================
        4. HERO → MASS TIMINGS TRANSITION
    =================================================================*/

    function handleHeroTransition(){

        if(!hero || !schedule){

            return;

        }


        const scrollPosition =
            window.scrollY;


        const heroHeight =
            hero.offsetHeight;


        const transitionStart =
            heroHeight * 0.55;


        const transitionDistance =
            heroHeight * 0.45;


        let progress =
            (
                scrollPosition -
                transitionStart
            ) /
            transitionDistance;


        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );


        if(heroImage){

            const zoom =
                1 +
                (progress * 0.07);


            heroImage.style.transform =
                `scale(${zoom})`;

        }


        /*
        Only manipulate the desktop schedule background.

        Mobile uses ::before so its separate image is
        not overwritten.
        */

        if(window.innerWidth > 900){

            const backgroundPosition =
                50 -
                (progress * 3);


            schedule.style.backgroundPosition =
                `center ${backgroundPosition}%`;

        }

    }


    /*=================================================================
        5. ACTIVE NAVIGATION
    =================================================================*/

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            ".navbar a"
        );


    function updateActiveNavigation(){

        let currentSection = "";


        sections.forEach(
            function(section){

                const sectionTop =
                    section.offsetTop -
                    150;


                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if(
                    window.scrollY >=
                    sectionTop &&

                    window.scrollY <
                    sectionBottom
                ){

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navigationLinks.forEach(
            function(link){

                link.classList.remove(
                    "current"
                );


                const href =
                    link.getAttribute(
                        "href"
                    );


                if(
                    href ===
                    "#" +
                    currentSection
                ){

                    link.classList.add(
                        "current"
                    );

                }

            }
        );

    }


    /*=================================================================
        6. COMBINED SCROLL HANDLER
    =================================================================*/

    function handleScroll(){

        handleHeaderScroll();

        handleHeroTransition();

        updateActiveNavigation();

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive:true
        }
    );


    handleScroll();


    /*=================================================================
        7. MOBILE MENU TOGGLE
    =================================================================*/

    if(menuBtn && navbar){

        menuBtn.addEventListener(
            "click",
            function(){

                const isOpen =
                    document.body.classList.toggle(
                        "menu-open"
                    );


                navbar.classList.toggle(
                    "active",
                    isOpen
                );


                menuBtn.classList.toggle(
                    "open",
                    isOpen
                );


                menuBtn.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                const icon =
                    menuBtn.querySelector("i");


                if(icon){

                    if(isOpen){

                        icon.classList.remove(
                            "fa-bars"
                        );

                        icon.classList.add(
                            "fa-xmark"
                        );

                    }else{

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }
        );

    }


    /*=================================================================
        8. CLOSE MENU AFTER NAVIGATION CLICK
    =================================================================*/

    if(navbar){

        navbar
            .querySelectorAll("a")
            .forEach(
                function(link){

                    link.addEventListener(
                        "click",
                        function(){

                            closeMobileMenu();

                        }
                    );

                }
            );

    }


    /*=================================================================
        9. SMOOTH ANCHOR SCROLLING
    =================================================================*/

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function(link){

                link.addEventListener(
                    "click",
                    function(event){

                        const targetId =
                            this.getAttribute(
                                "href"
                            );


                        if(
                            !targetId ||
                            targetId === "#"
                        ){

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if(!target){

                            return;

                        }


                        event.preventDefault();


                        target.scrollIntoView({

                            behavior:"smooth",

                            block:"start"

                        });

                    }
                );

            }
        );


    /*=================================================================
        10. PRELOADER
    =================================================================*/

    const preloader =
        document.querySelector(
            ".preloader"
        );


    window.addEventListener(
        "load",
        function(){

            if(preloader){

                preloader.classList.add(
                    "loaded"
                );

            }

        }
    );


    /*=================================================================
        11. RESIZE HANDLING
    =================================================================*/

    window.addEventListener(
        "resize",
        function(){

            handleHeaderScroll();

            handleHeroTransition();

            updateActiveNavigation();


            /*
            Keep mobile menu closed when
            switching back to desktop.
            */

            if(window.innerWidth > 900){

                closeMobileMenu();

            }

        }
    );


    /*=================================================================
        12. KEEP MENU CLOSED ON PAGE RESTORE
    =================================================================*/

    window.addEventListener(
        "pageshow",
        function(){

            closeMobileMenu();

        }
    );

});


/*=====================================================================
    13. ONE-SECTION-AT-A-TIME DESKTOP SCROLL

    Desktop mouse/trackpad only.
    Mobile touch scrolling is NOT intercepted.
======================================================================*/

document.addEventListener(
    "DOMContentLoaded",
    function(){

        const pageSections = [

            document.querySelector(
                ".hero"
            ),

            document.querySelector(
                ".schedule"
            ),

            document.querySelector(
                ".about"
            ),

            document.querySelector(
                ".gallery"
            ),

            document.querySelector(
                ".reviews"
            ),

            document.querySelector(
                ".suvarta"
            ),

            document.querySelector(
                ".contact"
            )

        ].filter(Boolean);


        if(!pageSections.length){

            return;

        }


        let currentSection = 0;

        let isScrolling = false;


        /*-------------------------------------------------------------
            FIND CURRENT SECTION
        -------------------------------------------------------------*/

        function updateCurrentSection(){

            const position =
                window.scrollY +
                (
                    window.innerHeight *
                    0.5
                );


            pageSections.forEach(
                function(
                    section,
                    index
                ){

                    const top =
                        section.offsetTop;


                    const bottom =
                        top +
                        section.offsetHeight;


                    if(
                        position >= top &&
                        position < bottom
                    ){

                        currentSection =
                            index;

                    }

                }
            );

        }


        /*-------------------------------------------------------------
            MOVE TO SECTION
        -------------------------------------------------------------*/

        function goToSection(index){

            if(index < 0){

                index = 0;

            }


            if(
                index >=
                pageSections.length
            ){

                index =
                    pageSections.length -
                    1;

            }


            if(
                isScrolling ||
                index === currentSection
            ){

                return;

            }


            currentSection =
                index;


            isScrolling = true;


            pageSections[
                currentSection
            ].scrollIntoView({

                behavior:"smooth",

                block:"start"

            });


            setTimeout(
                function(){

                    isScrolling = false;

                    updateCurrentSection();

                },
                900
            );

        }


        /*-------------------------------------------------------------
            DESKTOP WHEEL SCROLL
        -------------------------------------------------------------*/

        window.addEventListener(
            "wheel",
            function(event){

                const desktopPointer =
                    window.matchMedia(
                        "(hover: hover) and (pointer: fine)"
                    ).matches;


                /*
                Do nothing on mobile/touch devices.
                */

                if(!desktopPointer){

                    return;

                }


                if(
                    Math.abs(
                        event.deltaY
                    ) < 20
                ){

                    return;

                }


                event.preventDefault();


                if(isScrolling){

                    return;

                }


                updateCurrentSection();


                if(event.deltaY > 0){

                    goToSection(
                        currentSection + 1
                    );

                }else{

                    goToSection(
                        currentSection - 1
                    );

                }

            },
            {
                passive:false
            }
        );


        /*-------------------------------------------------------------
            NORMAL SCROLL SYNCHRONIZATION
        -------------------------------------------------------------*/

        window.addEventListener(
            "scroll",
            function(){

                if(!isScrolling){

                    updateCurrentSection();

                }

            },
            {
                passive:true
            }
        );


        /*-------------------------------------------------------------
            RESIZE
        -------------------------------------------------------------*/

        window.addEventListener(
            "resize",
            function(){

                updateCurrentSection();

            }
        );


        updateCurrentSection();

    }
);
