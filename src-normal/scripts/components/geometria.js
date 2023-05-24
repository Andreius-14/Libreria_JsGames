import * as THREE from "three";

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } );
// const material = new THREE.MeshStandardMaterial( { color: 0x44aa88 } );
const material = new THREE.MeshNormalMaterial();

export const cube = new THREE.Mesh( geometry, material );

// const makeCube = (size, x, y, z) => { 
//     const mesh = new THREE.Mesh(
//         new THREE.BoxGeometry(size, size, size),
//         new THREE.MeshNormalMaterial());
//     mesh.position.set(x, y, z);
//     return mesh;
// };
