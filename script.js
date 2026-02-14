document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 50; // The lower the faster

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const isPercentage = counter.innerText.includes('%');
            const isK = counter.innerText.includes('k');
            const hasPlus = counter.innerText.includes('+');

            let count = 0;
            const inc = target / speed;

            const updateCount = () => {
                count += inc;

                if (count < target) {
                    let displayValue = Math.ceil(count);

                    if (isK && displayValue > 1000) {
                        displayValue = (displayValue / 1000).toFixed(1) + 'k';
                    } else if (isK) {
                        // Keep it simple if it's supposed to be K but small
                        displayValue = displayValue;
                    }

                    counter.innerText = (hasPlus ? '+' : '') + displayValue + (isPercentage ? '%' : '');
                    setTimeout(updateCount, 15);
                } else {
                    // Final value setting to ensure accuracy
                    let finalValue = target;
                    if (isK) {
                        finalValue = (target / 1000) + 'k';
                    }
                    counter.innerText = (hasPlus ? '+' : '') + finalValue + (isPercentage ? '%' : '');
                }
            };

            updateCount();
            observer.unobserve(counter);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        countObserver.observe(counter);
    });
});
