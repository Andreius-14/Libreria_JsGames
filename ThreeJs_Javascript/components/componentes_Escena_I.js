import * as THREE from "three";
// Constantes
export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
export const renderer = new THREE.WebGLRenderer({antialias: true});
export const box3D = document.body || document.getElementById("container");

// Constantes - Propiedades
// camera.position.z = 5;
camera.position.set(3, 3, 5);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


// Insercion
box3D.appendChild( renderer.domElement );
