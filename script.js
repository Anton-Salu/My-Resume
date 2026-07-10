/* ═══════════════════════════════════════════
   ANTON SALU — Portfolio Scripts (Simplified)
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ─── Typewriter Effect ───
    const titles = ['Full-Stack Developer', 'ML Enthusiast', 'Problem Solver'];
    const typewriterEl = document.getElementById('typewriter');
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typewrite() {
        const current = titles[titleIndex];

        if (!isDeleting) {
            typewriterEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typewrite, 2000);
                return;
            }
            setTimeout(typewrite, 90);
        } else {
            typewriterEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typewrite, 400);
                return;
            }
            setTimeout(typewrite, 50);
        }
    }

    setTimeout(typewrite, 600);

    // ─── Scroll Reveal ───
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));

    // ─── Navbar Active Tab ───
    const navbar = document.getElementById('navbar');
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                let current = 'hero';
                const y = window.scrollY + 120;
                sections.forEach((s) => {
                    if (y >= s.offsetTop) current = s.id;
                });
                tabs.forEach((t) => t.classList.toggle('active', t.dataset.section === current));
                navbar.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });

    // ─── Mobile Nav Toggle ───
    const navToggle = document.getElementById('nav-toggle');
    const navTabs = document.getElementById('nav-tabs');

    navToggle.addEventListener('click', () => {
        const open = navTabs.classList.toggle('open');
        navToggle.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open);
    });

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            navTabs.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ─── Copy to Clipboard ───
    const copyButtons = document.querySelectorAll('[data-copy]');
    const feedback = document.getElementById('copy-feedback');

    copyButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const text = btn.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                feedback.textContent = '✓ Copied: ' + text;
                setTimeout(() => { feedback.textContent = ''; }, 2500);
            });
        });
    });

    // ─── Footer Year ───
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
