// BRAIMDA - Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    const reveals = document.querySelectorAll('.reveal');

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });

    // Smooth Scroll for local links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling (Mockup)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado exitosamente.');
            contactForm.reset();
        });
    }

    // Initial check for non-scroll reveals
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});