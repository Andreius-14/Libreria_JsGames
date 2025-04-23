// Components
import { camera, scene, renderer } from "../JS-Shared/threejs_Escena_I.js";
import { stats, controls, background } from "../JS-Shared/threejs_Escena_II.js";

// Complementos
import {
  worldAxis,
  worldGrid,
  worldFloor,
  worlNiebla,
} from "../JS-Shared/threejs_world.js";

import { Luz } from "../JS-Shared/threejs_luces.js";
import { geometria3D, text } from "../JS-Shared/threejs_texturas.js";

import { worldColor } from "../JS-Shared/Shared-Const.js";

init();
animate();

function init() {
  //🌱 PROPIEDADES
  // controls.autoRotate = true;
  // background()

  //🌱 INSERTAR
  geometria3D(undefined, text.color);

  worldGrid();
  worldAxis();
  // worldFloor()
  worlNiebla();

  // worldLight()
  Luz(worldColor.green, undefined, [-2, 2, 0], [0, 0, 0], true);
  // Luz(undefined,undefined,[2,2,0])
}

// 💀 Funciones Especiales

function animate() {
  requestAnimationFrame(animate);
  stats.update();
  controls.update();

  renderer.render(scene, camera);
}
