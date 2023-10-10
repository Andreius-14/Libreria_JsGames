// Components
import {camera,scene,renderer,controls} from "../components/componentes_Escena"
import {worldAxis,worldGrid} from "../components/componentes_world"
import {light,helper, worldLight } from "../components/componentes_luces";
import {cube} from "../components/geometria.js"

init();
animate();


function init () {

//🌱 PROPIEDADES
camera.position.set(3,3, 5 );
controls.autoRotate = true;

//🌱 INSERTAR
scene.add(cube);

scene.add(light,helper,worldLight);

scene.add(worldGrid,worldAxis);

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
