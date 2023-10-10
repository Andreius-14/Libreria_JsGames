import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";                            // Informacion de Consumo
import { OrbitControls } from "three/addons/controls/OrbitControls.js";           // Control de Camara - Sensilla

// import { createControls } from "./area-help.js";

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
export const renderer = new THREE.WebGLRenderer({antialias: true});
export const box3D = document.body || document.getElementById("container");

camera.position.z = 5;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

box3D.appendChild( renderer.domElement );

// AYUDA
  export const stats = new Stats();
  box3D.appendChild(stats.dom);

  export const controls = new OrbitControls(camera, renderer.domElement);
  // controls.target.set(0, 0.5, 0);
  controls.enablePan = false;   // Desplazar X,Y de Camara
  controls.enableDamping = true;// Suavizar Movimiento
  // controls.autoRotate = true;

  // export const controls = createControls(camera, renderer);
