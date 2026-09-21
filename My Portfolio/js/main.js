// ========================================
// MOBILE MENU (BURGER)
// ========================================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

// close the menu after clicking any link
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
    });
});

// close the menu with Escape
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
    }
});

// ========================================
// NAVBAR SHADOW ON SCROLL
// ========================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ========================================
// AUTO YEAR IN FOOTER
// ========================================

document.getElementById("year").textContent = new Date().getFullYear();

// ========================================
// TYPING EFFECT
// ========================================

const typingElement = document.getElementById("typing");

const typingTexts = [
    "Python Developer",
    "Data Analyst",
    "Web Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex++;

            if (textIndex === typingTexts.length) {
                textIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

// ========================================
// SCROLL REVEAL
// ========================================
// Watches every ".reveal" section and adds ".is-visible" to it
// the first time it enters the viewport, then stops watching it
// (so it never re-triggers on scroll-up/scroll-down).

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15, // fire once 15% of the section is visible
            rootMargin: "0px 0px -60px 0px", // trigger a bit before it fully reaches the bottom edge
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
} else {
    // very old browsers with no IntersectionObserver: just show everything
    revealElements.forEach((el) => el.classList.add("is-visible"));
}

// ========================================
// ACTIVE NAV LINK
// ========================================
// Highlights the nav-bar link of whichever section is
// currently in the middle of the screen while you scroll.

const sections = document.querySelectorAll("section[id]");
const navLinkMap = new Map();

document.querySelectorAll(".nav-links a").forEach((link) => {
    const id = link.getAttribute("href").slice(1); // "#about" -> "about"
    navLinkMap.set(id, link);
});

function setActiveLink(id) {
    navLinkMap.forEach((link) => link.classList.remove("active"));
    navLinkMap.get(id)?.classList.add("active");
}

if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            // pick the section with the largest visible area right now
            let mostVisible = null;

            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio)
                ) {
                    mostVisible = entry;
                }
            });

            if (mostVisible) {
                setActiveLink(mostVisible.target.id);
            }
        },
        {
            // count a section as "current" once it occupies the middle band of the screen
            rootMargin: "-40% 0px -40% 0px",
            threshold: [0, 0.25, 0.5, 0.75, 1],
        }
    );

    sections.forEach((section) => navObserver.observe(section));
}

// ========================================
// BACK TO TOP
// ========================================

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    backToTopBtn.classList.toggle("show", window.scrollY > 500);
});

backToTopBtn.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
    });
});
