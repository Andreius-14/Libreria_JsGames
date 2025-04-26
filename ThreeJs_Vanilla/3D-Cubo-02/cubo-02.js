import * as THREE from "three";

// Basico
import { scene, camera, renderer } from "../JS-Shared/threejs_Escena_I.js";
import { stats, controls } from "../JS-Shared/threejs_Escena_II.js";
import { World } from "../JS-Shared/threejs_world.js";
import {
  geometria3D,
  geo,
  materiales,
  AddImagenMap,
  textureLoad,
} from "../JS-Shared/threejs_texturas.js";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js"; // cuando se aplica la camara siempre apuntara a 0,0,0
// Campos - Instancias
// let camera, scene, renderer; //Si solo fuera esta linea y no 3 seria bueno
// let controls;
let mesh;
let prueba;
// Funciones
function init() {
  const rutaPared = "../assets/lado.gif";
  // Instancia e Propiedades
  // scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000,);
  // renderer = new THREE.WebGLRenderer({ antialias: true });
  World.Light();

  // GEOMETRIA NUEVA - CUBO [Inicio]
  const texture = textureLoad(rutaPared);
  texture.colorSpace = THREE.SRGBColorSpace;

  prueba = geometria3D({
    geometria: geo.Cubo(),
    posicion: [2, 2, 0],
    material: materiales.color(),
  });
  mesh = geometria3D({
    geometria: geo.Cubo(),
    material: materiales.color(),
  });

  AddImagenMap(prueba, rutaPared);
  AddImagenMap(mesh, rutaPared);

  //const geometry = new THREE.BoxGeometry(1, 1, 1);
  //const material = new THREE.MeshBasicMaterial({ map: texture });
  ////({ color: 0x44aa88 }) ({ map: texture })
  //

  // GEOMETRIA NUEVA - CUBO [Final]

  // controls = new OrbitControls(camera, renderer.domElement);
  // // controls.target.set(0, 0.5, 0);
  // controls.enablePan = false;   // Desplazar X,Y de Camara
  // controls.enableDamping = true;
  // controls.autoRotate = true;
  // controls.update();

  //scene.add(mesh);
  // INSERCION
  // document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;

  stats.update();
  controls.update();
  // INSERCION
  renderer.render(scene, camera);
}

init();
animate();

// 🌱 La funcion animate es Especial - Se ejecuta de Manera Continua FPS
