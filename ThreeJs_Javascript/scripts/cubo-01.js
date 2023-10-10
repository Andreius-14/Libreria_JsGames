import * as THREE from 'three';

// Esta Importando de Los Componentes Creados
import {scene,camera,renderer, stats,controls} from '../components/componentes_Escena.js'
import {worldAxis,worldGrid,worldFloor,worlNiebla,colores} from "../components/componentes_world.js";
import {helper,light} from "../components/componentes_luces.js"

import { cube , geometria3D,geo} from "../components/geometria.js";

let mesh;
const group = new THREE.Group()

init();
animate();

// const group = new THREE.Group()

function init() {

//Cambiando Propiedades
scene.background = new THREE.Color( colores.grey );

// AYUDA
worldFloor(true,colores.red)
worlNiebla(true,colores.grey)

scene.add(light, helper);
scene.add(worldGrid,worldAxis)


// INSERCION GEOMEATRIA [Se puede Agrupar]

// console.log(mesh);
group.add(geometria3D(geo.cubo),geometria3D(geo.toru))
scene.add(group);

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
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    group.children.forEach((objeto) => {
      // Realiza alguna acción en cada objeto
      objeto.rotation.x += 0.01;
      objeto.rotation.y += 0.01;
  });

  stats.update()
  controls.update();

	renderer.render( scene, camera );
}




// 🌱 En cubo-01 la camara se desplaza en PLANO CARTESIOANO 
// 🌱 En load-Completo rota sobre el objeto 3d

// 🌱 EL cubo no tiene sombras pero el piso si
