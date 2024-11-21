// Configuración básica de Three.js
let scene, camera, renderer;
let cube;

function init() {
    // Crear la escena
    scene = new THREE.Scene();
    
    // Configurar la cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Configurar el renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('grafico-3d-container').appendChild(renderer.domElement);
    
    // Crear un cubo (como ejemplo)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    // Iniciar la animación
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    // Rotar el cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

// Manejar el cambio de tamaño de la ventana
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

// Iniciar la visualización 3D cuando se cargue la página
window.onload = init;