import * as THREE from "three";
import { scene } from './componentes_Escena_I.js'

// Elementos A Insertar
export const worldAxis = (valor = 5) => { 
  const worldAxis = new THREE.AxesHelper(valor); 
  scene.add(worldAxis);
 }
export const worldGrid = (valor=[50,10]) => {
  const worldGrid = new THREE.GridHelper(...valor);
  scene.add(worldGrid)
  }

// Elementos AutoInsertados (Funciones)
export const worldFloor = (colorPiso = worldcolor.grey, tamaño = [20, 20]) => {
  let mesh = new THREE.Mesh(new THREE.PlaneGeometry(...tamaño), 
             new THREE.MeshPhongMaterial({ color: colorPiso, depthWrite: false }));
             
  mesh.rotation.x = - Math.PI / 2;
  scene.add(mesh);
}

export const worlNiebla = (color = worldcolor.grey) => {
  scene.fog = new THREE.Fog(color, 20, 50);
}


// OBJETO - COLORES
export const worldcolor = {
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

