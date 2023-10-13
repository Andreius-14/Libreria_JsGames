// Librerias
import * as THREE from "three";

// Constantes
export const scene = new THREE.Scene();
// export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
export const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000); //Recomendado
export const renderer = new THREE.WebGLRenderer({ antialias: true });
export const box3D = document.getElementById("container") || document.body;


// PROPIEDADES
document.addEventListener("DOMContentLoaded", function () {

    // Propiedades
    camera.position.set(0, 0, 5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111111)  // Una mejora Vizual - No afecta la Iluminacion

    box3D.appendChild(renderer.domElement);
});

// camera.updateProjectionMatrix();
// renderer.setClearColor("#111")
