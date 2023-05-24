// Components
import {camera,scene,renderer,controls} from "./components/area.js"
import {worldAxis,worldGrid} from "./components/area-help.js"

import {cube} from "./components/geometria.js"
import {light,helper, worldLight } from "./components/luces.js";
init();
animate();

// 💀 Funcion Principal
function init () {

//🌱 PROPIEDADES
camera.position.set(3,3, 5 );
controls.autoRotate = true;
//🌱 INSERTAR
scene.add(cube);
scene.add(light);
scene.add(helper);
scene.add(worldLight);
//🌱 INSERTAR AYUDA
scene.add(worldGrid);
scene.add(worldAxis);

//EVENTOS
window.addEventListener("resize", onWindowResize);
}

// 💀 Funciones

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 💀 Funciones Especiales

function animate() {
	requestAnimationFrame( animate );
  controls.update();
  render();
}

function render () {
	renderer.render( scene, camera );
}


// //-------- ----------
// // CREATING A GROUP
// //-------- ----------
// const group = new THREE.Group();
// scene.add(group);
// // changing position and rotation of the group
// group.position.x = -2;
// group.rotation.y = Math.PI / 180 * 45;
// //-------- ----------
// // ADDING MESH OBJECTS TO THE GROUP
// //-------- ----------
// group.add(makeCube(1.0, 0, 0, 0));
//  group.add(makeCube(0.5, 0, 2, 0));
// group.add(makeCube(0.5, 0, -2, 0));
// group.add(makeCube(0.5, 2, 0, 0));
// group.add(makeCube(0.5, -2, 0, 0));
