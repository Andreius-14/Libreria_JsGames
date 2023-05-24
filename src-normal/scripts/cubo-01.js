import * as THREE from 'three';

import {scene,camera,renderer, stats,controls} from './components/area.js'
import {worldAxis,worldGrid,worldFloor,worlNiebla,colores} from "./components/area-help.js";
import { cube } from "./components/geometria.js";
// let cube;

init();
animate();

function init() {

scene.background = new THREE.Color( colores.grey );

// LUZ - Luz Ayuda
const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2, 2, 1);
light.target.position.set(0, 0, 0)

const helper = new THREE.DirectionalLightHelper(light); // GUI Vizualiza la Luz
// AYUDA
worldFloor(true,colores.red)
worlNiebla(true,colores.grey)
scene.add(helper)
scene.add(worldGrid,worldAxis)
// INSERCION
scene.add(light);
scene.add( cube );

window.addEventListener("resize", onWindowResize);

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 🌱 Render [Especial se ejecuta continuamente]
function animate() {
	requestAnimationFrame( animate );
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

  stats.update()
  controls.update();

	renderer.render( scene, camera );
}


// import WebGL from 'three/addons/capabilities/WebGL.js';
// if ( WebGL.isWebGLAvailable() ) {
//
// 	// Initiate function or other initializations here
// 	animate();
//   alert("Funciona")
//
// } else {
//
// 	const warning = WebGL.getWebGLErrorMessage();
// 	document.getElementById( 'container' ).appendChild( warning );
//
// }
//

// 🌱 En cubo-01 la camara se desplaza en PLANO CARTESIOANO 
// 🌱 En load-Completo rota sobre el objeto 3d
