"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const scheduleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      const header = headerRef.current;
      const hero = heroRef.current;
      const heroImage = heroImageRef.current;
      const schedule = scheduleRef.current;

      if (!header || !hero) return;

      const heroBottom = hero.offsetTop + hero.offsetHeight;

      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      if (window.scrollY >= heroBottom - 80) {
        header.classList.add("nav-hidden");
      } else {
        header.classList.remove("nav-hidden");
      }

      if (heroImage && schedule) {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;

        const transitionStart = heroHeight * 0.55;
        const transitionDistance = heroHeight * 0.45;

        let progress =
          (scrollPosition - transitionStart) /
          transitionDistance;

        progress = Math.max(0, Math.min(1, progress));

        const zoom = 1 + progress * 0.07;

        heroImage.style.transform = `scale(${zoom})`;

        const backgroundPosition = 50 - progress * 3;

        schedule.style.backgroundPosition =
          `center ${backgroundPosition}%`;
      }

      updateActiveNavigation();
    };

    const updateActiveNavigation = () => {
      const sections =
        document.querySelectorAll<HTMLElement>("section[id]");

      const navigationLinks =
        document.querySelectorAll<HTMLAnchorElement>(".navbar a");

      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom =
          sectionTop + section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionBottom
        ) {
          currentSection = section.id;
        }
      });

      navigationLinks.forEach((link) => {
        link.classList.remove("current");

        if (
          link.getAttribute("href") ===
          `#${currentSection}`
        ) {
          link.classList.add("current");
        }
      });
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* PRELOADER */}

      <div
        className={`preloader ${loaded ? "loaded" : ""}`}
      >
        <div className="loader"></div>
      </div>


      {/* HEADER */}

      <header
        ref={headerRef}
        className="header"
      >
        <div className="container nav-container">

          <a
            href="#home"
            className="logo"
            aria-label="St. Thomas Church, Sandor"
            onClick={handleNavClick}
          >
            <img
              src="/images/logo.png"
              alt="St. Thomas Church logo"
            />
          </a>


          <nav
            className={`navbar ${
              menuOpen ? "active" : ""
            }`}
            aria-label="Main navigation"
          >
            <ul>

              <li>
                <a
                  href="#schedule"
                  onClick={handleNavClick}
                >
                  Mass Times
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  onClick={handleNavClick}
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#priests"
                  onClick={handleNavClick}
                >
                  Current Priests
                </a>
              </li>

              <li>
                <a
                  href="#ministries"
                  onClick={handleNavClick}
                >
                  Ministries
                </a>
              </li>

              <li>
                <a
                  href="#suvarta"
                  onClick={handleNavClick}
                >
                  Suvarta
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  onClick={handleNavClick}
                >
                  Find Us
                </a>
              </li>

            </ul>
          </nav>


          <button
            className={`menu-btn ${
              menuOpen ? "open" : ""
            }`}
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            <i
              className={
                menuOpen
                  ? "fa-solid fa-xmark"
                  : "fa-solid fa-bars"
              }
            ></i>
          </button>

        </div>
      </header>


      {/* HERO */}

      <section
        ref={heroRef}
        className="hero"
        id="home"
      >
        <div className="hero-overlay"></div>

        <img
          ref={heroImageRef}
          src="/images/hero.jpg"
          className="hero-image"
          alt="St. Thomas Church"
        />

        <div className="hero-content">

          <div className="hero-buttons">

            <a
              href="#schedule"
              className="btn btn-primary"
            >
              Mass Timings
            </a>

            <a
              href="#about"
              className="btn btn-secondary"
            >
              About Us
            </a>

            <a
              href="#priests"
              className="btn btn-secondary"
            >
              Current Priests
            </a>

            <a
              href="#contact"
              className="btn btn-secondary"
            >
              Find Us
            </a>

          </div>

        </div>
      </section>


      {/* MASS SCHEDULE */}

      <section
        ref={scheduleRef}
        className="schedule section"
        id="schedule"
      >
        <div className="container">

          <div className="section-title">

            <span>
              MASS SCHEDULE
            </span>

            <h2>
              Service Times
            </h2>

          </div>


          <div className="schedule-grid">

            <div className="schedule-card">

              <h3>
                Sunday
              </h3>

              <ul>

                <li>
                  <span>Mass</span>
                  <strong>6:00 AM</strong>
                </li>

                <li>
                  <span>Mass</span>
                  <strong>7:30 AM</strong>
                </li>

                <li>
                  <span>Mass</span>
                  <strong>9:00 AM</strong>
                </li>

                <li>
                  <span>Mass</span>
                  <strong>6:00 PM</strong>
                </li>

              </ul>

            </div>


            <div className="schedule-card">

              <h3>
                Monday - Saturday
              </h3>

              <ul>

                <li>
                  <span>Mass</span>
                  <strong>6:00 AM</strong>
                </li>

                <li>
                  <span>Mass</span>
                  <strong>7:00 PM</strong>
                </li>

              </ul>

            </div>


            <div className="schedule-card">

              <h3>
                First Friday
              </h3>

              <ul>

                <li>
                  <span>Mass</span>
                  <strong>6:00 AM</strong>
                </li>

                <li>
                  <span>Mass</span>
                  <strong>7:00 PM</strong>
                </li>

              </ul>

            </div>

          </div>

        </div>
      </section>


      {/* ABOUT */}

      <section
        className="about section"
        id="about"
      >
        <div className="container">

          <div className="section-title">

            <span>
              ABOUT THIS PLACE
            </span>

            <h2>
              A Sanctuary of Peace
            </h2>

            <p>
              St. Thomas Church, Sandor is a beloved
              Catholic parish nestled in the heart of
              Vasai-Virar where faith, community and
              serenity come together.
            </p>

          </div>


          <div className="about-grid">

            <div className="info-card">

              <div className="icon">
                <i className="fa-solid fa-leaf"></i>
              </div>

              <h3>
                Peaceful Place
              </h3>

              <p>
                Quiet surroundings and beautiful
                greenery provide a perfect place
                for prayer and reflection.
              </p>

            </div>


            <div className="info-card">

              <div className="icon">
                <i className="fa-solid fa-heart"></i>
              </div>

              <h3>
                Friendly Priests
              </h3>

              <p>
                Dedicated clergy guiding
                the parish community
                with love and care.
              </p>

            </div>


            <div className="info-card">

              <div className="icon">
                <i className="fa-solid fa-clover"></i>
              </div>

              <h3>
                Calmness & Serenity
              </h3>

              <p>
                Experience peace in a
                welcoming environment
                filled with faith.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* CURRENT PRIESTS */}

      <section
        className="gallery section"
        id="priests"
      >
        <div className="container">

          <div className="section-title">

            <span>
              CURRENT PRIESTS
            </span>

            <h2>
              Current Priests
            </h2>

          </div>


          <div className="gallery-grid">

            <img
              src="/images/gallery1.jpg"
              alt="Current Priest"
            />

            <img
              src="/images/gallery2.jpg"
              alt="Current Priest"
            />

            <img
              src="/images/gallery3.jpg"
              alt="Current Priest"
            />

            <img
              src="/images/gallery4.jpg"
              alt="Current Priest"
            />

          </div>

        </div>
      </section>


      {/* MINISTRIES */}

      <section
        className="reviews section"
        id="ministries"
      >
        <div className="container">

          <div className="section-title">

            <span>
              MINISTRIES
            </span>

            <h2>
              Our Ministries
            </h2>

          </div>


          <div className="review-wrapper">

            <div className="rating-box">

              <h3>
                Serving Together
              </h3>

              <p>
                Our parish ministries bring
                together people of faith,
                service and community.
              </p>

            </div>


            <div className="review-list">

              <div className="review-card">

                <h3>
                  Parish Ministry
                </h3>

                <p>
                  Supporting the spiritual
                  and community life of
                  the parish.
                </p>

              </div>


              <div className="review-card">

                <h3>
                  Youth Ministry
                </h3>

                <p>
                  Creating opportunities
                  for young people to
                  grow in faith and fellowship.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* SUVARTA */}

      <section
        className="suvarta section"
        id="suvarta"
      >
        <div className="container">

          <div className="section-title">

            <span>
              SUVARTA
            </span>

            <h2>
              Good News
            </h2>

            <p>
              This section is reserved for
              Suvarta content.

              We can add parish news,
              reflections, announcements,
              articles or publications here.
            </p>

          </div>

        </div>
      </section>


      {/* CONTACT */}

      <section
        className="contact section"
        id="contact"
      >
        <div className="container contact-grid">

          <div>

            <h2>
              Find Us
            </h2>

            <p>
              <strong>
                Address
              </strong>
              <br />
              St. Thomas Church Road,
              Sandor,
              Vasai West,
              Maharashtra
            </p>

            <p>
              <strong>
                Opening
              </strong>
              <br />
              Opens Daily
              5:30 AM
            </p>

            <p>
              <strong>
                Phone
              </strong>
              <br />
              0250-2322798
            </p>

          </div>


          <div>

            <iframe
              src="https://www.google.com/maps/embed?pb="
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Thomas Church location"
            ></iframe>

          </div>

        </div>
      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div className="container">

          <h3>
            St. Thomas Church, Sandor
          </h3>

          <p>
            A peaceful Catholic parish
            in Vasai-Virar welcoming all.
          </p>

          <p>
            © 2026 St. Thomas Church.
            All Rights Reserved.
          </p>

        </div>

      </footer>
    </>
  );
}