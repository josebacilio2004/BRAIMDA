// BRAIMDA - Advanced Interactivity & 3D Prototyping Engine

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

    // --- 4. Extraordinary 3D Visualizer (Three.js) ---
    const container = document.getElementById('three-container');
    if (container && typeof THREE !== 'undefined') {
        initExtraordinary3D();
    }

    function initExtraordinary3D() {
        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        camera.position.set(5, 5, 8);
        camera.lookAt(0, 0, 0);

        // Lighting System
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 5);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 1024;
        dirLight.shadow.mapSize.height = 1024;
        scene.add(dirLight);

        // State & Materials
        let currentType = 'warning';
        let currentColor = 0xF1C40F; // Default Safety Yellow
        
        const tileMaterial = new THREE.MeshStandardMaterial({ 
            color: currentColor,
            roughness: 0.6,
            metalness: 0.1
        });

        const tileGroup = new THREE.Group();
        scene.add(tileGroup);

        // --- Model Generation Functions ---
        function createWarningTile() {
            tileGroup.clear();
            
            // Base Tile with beveled appearance
            const baseGeo = new THREE.BoxGeometry(4, 0.4, 4);
            const base = new THREE.Mesh(baseGeo, tileMaterial);
            base.receiveShadow = true;
            tileGroup.add(base);

            // Domes (Truncated Cones)
            const domeGeo = new THREE.CylinderGeometry(0.2, 0.3, 0.2, 32);
            const spacing = 0.8;
            const offset = 1.6;

            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    const dome = new THREE.Mesh(domeGeo, tileMaterial);
                    dome.position.set((i * spacing) - offset, 0.3, (j * spacing) - offset);
                    dome.castShadow = true;
                    tileGroup.add(dome);
                }
            }
        }

        function createDirectionalTile() {
            tileGroup.clear();
            
            // Base Tile
            const baseGeo = new THREE.BoxGeometry(4, 0.4, 4);
            const base = new THREE.Mesh(baseGeo, tileMaterial);
            base.receiveShadow = true;
            tileGroup.add(base);

            // Bars
            const barGeo = new THREE.BoxGeometry(0.35, 0.2, 3.2);
            const spacing = 0.9;
            const offset = 1.35;

            for (let i = 0; i < 4; i++) {
                const bar = new THREE.Mesh(barGeo, tileMaterial);
                bar.position.set((i * spacing) - offset, 0.3, 0);
                bar.castShadow = true;
                tileGroup.add(bar);
            }
        }

        // Initial Build
        createWarningTile();

        // --- Configurator Interactivity ---
        const typeButtons = document.querySelectorAll('.ui-btn');
        const colorButtons = document.querySelectorAll('.color-btn');

        typeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                typeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentType = btn.dataset.type;
                if (currentType === 'warning') createWarningTile();
                else createDirectionalTile();
            });
        });

        colorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                colorButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentColor = btn.dataset.color;
                tileMaterial.color.set(currentColor);
            });
        });

        // --- Hero Logic & Interaction ---
        let mouseX = 0, mouseY = 0;
        let targetRotationX = 0, targetRotationY = 0;

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / container.clientWidth) - 0.5;
            mouseY = ((e.clientY - rect.top) / container.clientHeight) - 0.5;
        });

        function animate() {
            requestAnimationFrame(animate);
            
            // Influence logic
            targetRotationY += 0.005; // Base rotation
            
            tileGroup.rotation.y += (targetRotationY + (mouseX * 2) - tileGroup.rotation.y) * 0.05;
            tileGroup.rotation.x += ((mouseY * 2) - tileGroup.rotation.x) * 0.05;

            renderer.render(scene, camera);
        }

        // Resize
        window.addEventListener('resize', () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });

        animate();
    }

    // --- 5. Contact Form ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por contactarnos! Tu mensaje ha sido enviado exitosamente.');
            contactForm.reset();
        });
    }
});