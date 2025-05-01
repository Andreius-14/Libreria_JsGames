// Basico
import {
  scene,
  camera,
  renderer,
  stats,
  controls,
} from "../../JS-Shared/threejs/Main.js";
// Componentes Extra
import { World } from "../../JS-Shared/threejs/World.js";
import { Luces } from "../../JS-Shared/threejs/Luces.js";
import { geometria3D, materiales } from "../../JS-Shared/threejs/Geometria.js";

import { worldColor } from "../../JS-Shared/Shared-Const.js";

import GUI from "lil-gui";
function init() {
  //World.Light();
  World.Grid(scene);
  World.Axis(scene);
  World.Floor(scene);
  //World.Background();
  //let luz1 = Luces.Direccional("red", 1, [4, 5, 0], [4, 0, 0], true);
  //let luz2 = Luces.Direccional("blue", 1, [-4, 5, 0], [-4, 0, 0], true);

  Luces.Sol(scene);
  Luces.Linterna(scene, [4, 5, 0], [4, 0, 0], {
    color: "red",
    intensidad: 10,
    ayuda: true,
  });
  Luces.Linterna(scene, [-4, 5, 0], [-4, 0, 0], {
    color: "blue",
    intensidad: 10,
    ayuda: true,
  });
  Luces.Linterna(scene, [-4, 5, -5], [-4, 0, -5], {
    color: "white",
    intensidad: 10,
    ayuda: true,
  });

  const cubo = geometria3D(scene, {
    material: materiales.Sombra(),
  });
  const gui = new GUI();
  gui.add(cubo.position, "x", -5, 5).name("Mover X");
  gui.addColor(cubo.material, "color").name("Color del Cubo");

  //// Creamos un objeto de parámetros
  //const parametros = {
  //  posicionX: cubo.position.x,
  //  color: cubo.material.color,
  //};
  //
  //// Ahora agregas los controles
  //gui.add(parametros, "posicionX", -5, 5).onChange((valor) => {
  //  cubo.position.x = valor;
  //});
  //
  //gui.addColor(parametros, "color").onChange((valor) => {
  //  cubo.material.color.set(valor);
  //});
}

function animate() {
  stats.update();
  controls.update();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
animate();
