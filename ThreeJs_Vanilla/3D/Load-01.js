import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// 🌱 Instancia e Propiedades [Scene - Camaera - renderer]
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color(0xbfe3dd);
camera.position.set(0, 0, 3);
renderer.setSize(window.innerWidth, window.innerHeight);

// 🌱 GEOMETRIA NUEVA -- Load
const loader = new GLTFLoader();
let mesh = null;
loader.load("../assets/scene.gltf", (gltf) => {
  mesh = gltf.scene;

  // INSERCION
  scene.add(mesh);
});

// INSERCION
document.body.appendChild(renderer.domElement);

// 🌱 Render
function animate() {
  requestAnimationFrame(animate);
  if (mesh) {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
  }

  // INSERCION
  renderer.render(scene, camera);
}

animate();
