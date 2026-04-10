// BRAIMDA - Interactivity & 3D Engine

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Header & Navigation ---
    const header = document.getElementById('main-header');
    const reveals = document.querySelectorAll('.reveal');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Scroll Reveal Animations ---
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => observer.observe(reveal));

    // --- 3. Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 4. Integrated 3D Visualizer (Three.js) ---
    const container = document.getElementById('three-container');
    if (container && typeof THREE !== 'undefined') {
        initThreeJS();
    }

    function initThreeJS() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        camera.position.set(4, 4, 8);
        camera.lookAt(0, 0, 0);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // --- Create Tactile Tile ---
        const tileGroup = new THREE.Group();
        
        // Base Tile
        const baseGeometry = new THREE.BoxGeometry(4, 0.3, 4);
        const baseMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xcccccc, // Premium Light Grey
            roughness: 0.4,
            metalness: 0.2
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        tileGroup.add(base);

        // Truncated Domes (Buttons)
        const domeGeometry = new THREE.CylinderGeometry(0.2, 0.25, 0.15, 32);
        const domeMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x999999, // Slightly darker grey for contrast
            roughness: 0.3,
            metalness: 0.3
        });

        const spacing = 0.8;
        const offset = 1.6;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const dome = new THREE.Mesh(domeGeometry, domeMaterial);
                dome.position.set(
                    (i * spacing) - offset,
                    0.2,
                    (j * spacing) - offset
                );
                tileGroup.add(dome);
            }
        }

        scene.add(tileGroup);

        // Animation
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) - 0.5;
            mouseY = (e.clientY / window.innerHeight) - 0.5;
        });

        function animate() {
            requestAnimationFrame(animate);
            
            // Auto rotation + Mouse influence
            tileGroup.rotation.y += 0.005;
            tileGroup.rotation.y += mouseX * 0.05;
            tileGroup.rotation.x += mouseY * 0.05;

            renderer.render(scene, camera);
        }

        // Window Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        animate();
    }

    // --- 5. Form Handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado exitosamente.');
            contactForm.reset();
        });
    }
});