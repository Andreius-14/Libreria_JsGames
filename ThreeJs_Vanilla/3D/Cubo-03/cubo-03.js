// Components
import { camera, scene, renderer } from "../JS-Shared/threejs_Escena_I.js";
import { stats, controls } from "../JS-Shared/threejs_Escena_II.js";

// Complementos
import { World } from "../JS-Shared/threejs_world.js";
import { Luces } from "../JS-Shared/threejs_luces.js";

import { geometria3D, materiales } from "../JS-Shared/threejs_texturas.js";

import { worldColor } from "../JS-Shared/Shared-Const.js";

init();
animate();

function init() {
  //🌱 PROPIEDADES
  // controls.autoRotate = true;

  //🌱 INSERTAR
  geometria3D({ material: materiales.Sombra() });
  geometria3D({
    material: materiales.Sombra(),
    posicion: [2, 2],
    color: worldColor.yellow,
  });
  geometria3D({
    material: materiales.Sombra(),
    posicion: [-2, 2],
    color: worldColor.blue,
  });

  //World.Background();
  World.Grid();
  World.Axis();
  World.Floor();
  //World.Niebla();
  World.Light();

  Luces.Direccional(worldColor.green, 0.3, [0, 2, 0], [2, 2, 0], true);
  Luces.Focal(worldColor.blue, 250, 15, 0.5, 1, [5, 5, 0], [5, 0, 0], true);
  Luces.Focal(worldColor.red, 250, 15, 0.5, 1, [-5, 5, 0], [-5, 0, 0], true);
}

// 💀 Funciones Especiales

function animate() {
  requestAnimationFrame(animate);
  stats.update();
  controls.update();

  renderer.render(scene, camera);
}
