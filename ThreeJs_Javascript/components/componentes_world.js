import * as THREE from "three";
import { scene } from './componentes_Escena.js'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";           // Control de Camara - Sensilla
import Stats from "three/addons/libs/stats.module.js";                            // Informacion de Consumo

// export const controls = new OrbitControls(camera, renderer.domElement);
//   // controls.target.set(0, 0.5, 0);
//   controls.enablePan = false;   // Desplazar X,Y de Camara
//   controls.enableDamping = true;// Suavizar Movimiento
//   controls.autoRotate = true;


// VARIOS PARAMETROS
// export function createControls(camera, renderer) {
//   const controls = new OrbitControls(camera, renderer.domElement);
//   // controls.target.set(0, 0.5, 0);
//   controls.enablePan = false;   // Desplazar X,Y de Camara
//   controls.enableDamping = true;// Suavizar Movimiento
//   controls.autoRotate = true;
//   return controls;
// }

// SIN PARAMETROS
// export const worldAxis = (booleano,numero=5) => {
//   const worldAxis = new THREE.AxesHelper(numero); // XYZ DE LA ZONA
//   if (booleano) {
//     return worldAxis
//   }
// }

// Elementos A Insertar
export const worldAxis = new THREE.AxesHelper(5);
export const worldGrid = new THREE.GridHelper(50, 10);

// Elementos AutoInsertados (Funciones)
export const worldFloor = (booleano=true, colorPiso = "0x999999") => {
  if (booleano) {
    let mesh = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshPhongMaterial({ color: colorPiso, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    scene.add(mesh);
  }
}

export const worlNiebla = (booleano=true, color = "0xe0e0e0") => {
  if (booleano) {
    scene.fog = new THREE.Fog(color, 20, 50);
  }
}
// const stats = new Stats();
// document.body.appendChild(stats.dom);

export const colores = {
  red: 0xFF0000,
  green: 0x00FF00,
  blue: 0x0000FF,
  yellow: 0xFFFF00,
  magenta: 0xFF00FF,
  cian: 0x00FFFF,
  orange: 0xFFA500,
  purple: 0x800080,
  verdeOscuro: 0x008000,
  azulOscuro: 0x000080,
  brown: 0x800000,
  grey: 0xe0e0e0,
  black: 0x000000,
};

