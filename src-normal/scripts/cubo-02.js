import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // cuando se aplica la camara siempre apuntara a 0,0,0
// Campos - Instancias
let camera, scene, renderer; //Si solo fuera esta linea y no 3 seria bueno
let mesh;
let controls;

init();
animate();

// Funciones
function init() {

  // Instancia e Propiedades
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000,);
  renderer = new THREE.WebGLRenderer({ antialias: true });

  camera.position.z = 2;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // GEOMETRIA NUEVA - CUBO
  const texture = new THREE.TextureLoader().load("./assets/lado.gif");
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture }); //({ color: 0x44aa88 }) ({ map: texture })
  mesh = new THREE.Mesh(geometry, material);

  controls = new OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 0.5, 0);
  controls.enablePan = false;   // Desplazar X,Y de Camara
  controls.enableDamping = true;// Suavizar Movimiento
  controls.autoRotate = true;
  // controls.update(); 

  
  scene.add(mesh);
  // INSERCION
  document.body.appendChild(renderer.domElement);

  // Extra - Evento que funciona al cambiar el tamaño de la ventana
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  // mesh.rotation.x += 0.005;
  // mesh.rotation.y += 0.01;

  controls.update(); 
  // INSERCION 
  renderer.render(scene, camera);
}

// 🌱 La funcion animate es Especial - Se ejecuta de Manera Continua FPS

