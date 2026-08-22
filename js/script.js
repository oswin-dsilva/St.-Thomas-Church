/*=====================================================================
    ST. THOMAS CHURCH - MAIN JAVASCRIPT
======================================================================*/


/*=====================================================================
    1. DOM READY
======================================================================*/

document.addEventListener("DOMContentLoaded", function(){


    /*=================================================================
        ELEMENTS
    =================================================================*/

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
        2. HEADER SCROLL BEHAVIOUR
    =================================================================*/

    function handleHeaderScroll(){

        if(!header || !hero){

            return;

        }


        /*
        ---------------------------------------------------------------
        Determine where the hero section ends
        ---------------------------------------------------------------
        */

        const heroBottom =
            hero.offsetTop +
            hero.offsetHeight;


        /*
        ---------------------------------------------------------------
        Add/remove normal scrolled class
        ---------------------------------------------------------------
        */

        if(window.scrollY > 50){

            header.classList.add(
                "scrolled"
            );

        }else{

            header.classList.remove(
                "scrolled"
            );

        }


        /*
        ---------------------------------------------------------------
        Hide desktop navigation after Hero
        ---------------------------------------------------------------
        */

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
        3. HERO → MASS TIMINGS TRANSITION
    =================================================================*/

    function handleHeroTransition(){

        if(
            !hero ||
            !schedule
        ){

            return;

        }


        const scrollPosition =
            window.scrollY;


        const heroHeight =
            hero.offsetHeight;


        /*
        ---------------------------------------------------------------
        Start the transition before reaching Mass Timings
        ---------------------------------------------------------------
        */

        const transitionStart =
            heroHeight * 0.55;


        const transitionDistance =
            heroHeight * 0.45;


        /*
        ---------------------------------------------------------------
        Calculate transition progress

        0 = Hero completely visible

        1 = Mass Timings completely visible
        ---------------------------------------------------------------
        */

        let progress =
            (
                scrollPosition -
                transitionStart
            ) /
            transitionDistance;


        /*
        ---------------------------------------------------------------
        Keep value between 0 and 1
        ---------------------------------------------------------------
        */

        progress =
            Math.max(
                0,
                Math.min(
                    1,
                    progress
                )
            );



        /*-------------------------------------------------------------
            HERO IMAGE ZOOM
        -------------------------------------------------------------*/

        if(heroImage){

            const zoom =
                1 +
                (
                    progress *
                    0.07
                );


            heroImage.style.transform =
                `scale(${zoom})`;

        }



        /*-------------------------------------------------------------
            MASS TIMINGS BACKGROUND MOVEMENT
        -------------------------------------------------------------*/

        const backgroundPosition =
            50 -
            (
                progress *
                3
            );


        schedule.style.backgroundPosition =
            `center ${backgroundPosition}%`;

    }



    /*=================================================================
        4. COMBINED SCROLL HANDLER
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


    /*
    ---------------------------------------------------------------
    Run once on page load
    ---------------------------------------------------------------
    */

    handleScroll();



    /*=================================================================
        5. MOBILE MENU
    =================================================================*/

    if(
        menuBtn &&
        navbar
    ){

        menuBtn.addEventListener(
            "click",
            function(){

                /*
                -------------------------------------------------------
                Toggle menu
                -------------------------------------------------------
                */

                navbar.classList.toggle(
                    "active"
                );


                menuBtn.classList.toggle(
                    "open"
                );


                /*
                -------------------------------------------------------
                Accessibility
                -------------------------------------------------------
                */

                const isOpen =
                    navbar.classList.contains(
                        "active"
                    );


                menuBtn.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                /*
                -------------------------------------------------------
                Hamburger icon
                -------------------------------------------------------
                */

                const icon =
                    menuBtn.querySelector(
                        "i"
                    );


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
        6. CLOSE MOBILE MENU WHEN LINK IS CLICKED
    =================================================================*/

    if(navbar){

        const navLinks =
            navbar.querySelectorAll(
                "a"
            );


        navLinks.forEach(
            function(link){

                link.addEventListener(
                    "click",
                    function(){

                        /*
                        ------------------------------------------------
                        Close menu
                        ------------------------------------------------
                        */

                        navbar.classList.remove(
                            "active"
                        );


                        /*
                        ------------------------------------------------
                        Reset button
                        ------------------------------------------------
                        */

                        if(menuBtn){

                            menuBtn.classList.remove(
                                "open"
                            );


                            menuBtn.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }


                        /*
                        ------------------------------------------------
                        Reset icon
                        ------------------------------------------------
                        */

                        const icon =
                            menuBtn
                                ? menuBtn.querySelector(
                                    "i"
                                )
                                : null;


                        if(icon){

                            icon.classList.remove(
                                "fa-xmark"
                            );


                            icon.classList.add(
                                "fa-bars"
                            );

                        }

                    }
                );

            }
        );

    }



    /*=================================================================
        7. SMOOTH SCROLLING
    =================================================================*/

    const allAnchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    allAnchorLinks.forEach(
        function(link){

            link.addEventListener(
                "click",
                function(event){

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    /*
                    ----------------------------------------------------
                    Ignore empty links
                    ----------------------------------------------------
                    */

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


                    /*
                    ----------------------------------------------------
                    Smooth scroll
                    ----------------------------------------------------
                    */

                    target.scrollIntoView({

                        behavior:"smooth",

                        block:"start"

                    });

                }
            );

        }
    );



    /*=================================================================
        8. ACTIVE NAVIGATION
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
        9. PRELOADER
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
        10. RESIZE HANDLING
    =================================================================*/

    window.addEventListener(
        "resize",
        function(){

            handleHeaderScroll();

            handleHeroTransition();

            updateActiveNavigation();

        }
    );


});
