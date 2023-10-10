import * as THREE from "three";
import { scene } from './componentes_Escena.js'

const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } ); //!Sombra
// const material = new THREE.MeshStandardMaterial( { color: 0x44aa88 } ); //Sombra
const material = new THREE.MeshNormalMaterial(); //Drogas

export const cube = new THREE.Mesh(geometry, material);

export const text = {
    Sombra: new THREE.MeshBasicMaterial({ color: 0x44aa88 }),
    SombraMejorada: new THREE.MeshStandardMaterial({ color: 0x44aa88 }),
    Drogas: new THREE.MeshNormalMaterial(),
    // Agrega Mas
};

export const geo = {
    Esfera: new THREE.SphereGeometry(0.7, 32, 16),
    Capsula: new THREE.CapsuleGeometry(1, 1, 4, 8),
    Cilindro: new THREE.CylinderGeometry(0.5, 0.5, 2, 32),
    cubo: new THREE.BoxGeometry(1, 1, 1),
    toru: new THREE.TorusGeometry( 2, 0.5, 16, 50 ),
    // Agrega Mas
};

export const geometria3D = (geometria=geo.Esfera, textura=text.Drogas ,posicion = { x: 0, y: 0, z: 0 } ,escena = scene ) => {
    const objeto = new THREE.Mesh(geometria, textura);
    objeto.position.set(posicion.x, posicion.y, posicion.z)
    escena.add(objeto);
    return objeto;

}

// const makeCube = (size, x, y, z) => { 
//     const mesh = new THREE.Mesh(
//         new THREE.BoxGeometry(size, size, size),
//         new THREE.MeshNormalMaterial());
//     mesh.position.set(x, y, z);
//     return mesh;
// };
