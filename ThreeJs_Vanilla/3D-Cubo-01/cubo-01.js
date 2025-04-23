// Basico
import { scene, camera, renderer } from "../JS-Shared/threejs_Escena_I.js";
import { stats, controls, background } from "../JS-Shared/threejs_Escena_II.js";

// Complementos
import {
  worldAxis,
  worldGrid,
  worldFloor,
  worlNiebla,
} from "../JS-Shared/threejs_world.js";

import { Luz } from "../JS-Shared/threejs_luces.js";
import { geometria3D, geo, text } from "../JS-Shared/threejs_texturas.js";

import { worldColor } from "../JS-Shared/Shared-Const.js";

init();
animate();

// CONSTANTES
//const group = new THREE.Group();

//FUNCIONES
function init() {
  // PROPIEDADES
  // scene.background = new THREE.Color( worldcolor.grey );
  background();

  geometria3D();
  //geometria3D(geo.cubo);
  //geometria3D(geo.Capsula, undefined, [3, 3, 1]);

  // INSERCION WORLD
  worldFloor();
  //worlNiebla();
  worldGrid();
  worldAxis();

  // INSERCION LUCES
  //scene.add(light, helper);
  //
  // INSERCION GEOMEATRIA [Se puede Agrupar]

  Luz(worldColor.gray, 1, [-2, 2, 0], [0, 0, 0], true);
  //scene.add(group);
}

// 🌱 Render [Especial se ejecuta continuamente]
function animate() {
  requestAnimationFrame(animate);
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  //group.children.forEach((objeto, indice) => {
  //  // Realiza alguna acción en cada objeto
  //  let i = indice + 1;
  //  objeto.rotation.x += i * 0.01;
  //  objeto.rotation.y += i * 0.01;
  //});
  //
  stats.update();
  controls.update();
  renderer.render(scene, camera);
}

// 🌱 En cubo-01 la camara se desplaza en PLANO CARTESIOANO
// 🌱 En load-Completo rota sobre el objeto 3d

// 🌱 EL cubo no tiene sombras pero el piso si
