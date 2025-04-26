/* eslint-disable no-unused-vars */
//import * as THREE from "three";

// Basico
import { scene, camera, renderer } from "../JS-Shared/threejs_Escena_I.js";
import { stats, controls } from "../JS-Shared/threejs_Escena_II.js";
// Componentes Extra
import { World } from "../JS-Shared/threejs_world.js";
import { Luces } from "../JS-Shared/threejs_luces.js";
import { geometria3D, geo, materiales } from "../JS-Shared/threejs_texturas.js";
import {
  AddImageMap,
  AddImageNormalMap,
  AddImageAO,
  AddImageAlphaMap,
} from "../JS-Shared/threejs_texturas.js";

import { worldColor } from "../JS-Shared/Shared-Const.js";

let mesh = "";
let niebla = "";
const rotacion = 0.005;

function init() {
  // camera.position.set(0, 0, 5);

  // ESCENARIO
  // background(worldColor.dark_gray);
  World.Light(worldColor.dark_gray);
  World.Grid();
  // camera.position.set(0,0,0)

  // LUCES - GEOMETRIS
  // Luz(worldColor.red,0.5,[-5,0,0],undefined,true)
  Luces.Direccional(undefined, 1, [3, 0, 0]);

  // geometria3D(geo.Capsula(),materiales.Sombra,[0,4,0])

  //----------------------------------------------------------------//
  //                        OBJETOS
  //----------------------------------------------------------------//

  mesh = geometria3D({ material: materiales.recibeImagen() });
  niebla = geometria3D({
    geometria: geo.Esfera(0.72),
    material: materiales.recibeImagen(),
  });

  geometria3D({ material: materiales.Sombra(), posicion: [0, 3] });
  geometria3D({ material: materiales.Sombra(), posicion: [2, 2] });
  geometria3D({ posicion: [-2, 2], color: worldColor.blue });
  //----------------------------------------------------------------//
  //                      PROPIEDADES
  //----------------------------------------------------------------//

  // MESH
  AddImageMap(mesh, "../assets/2k_earth_daymap.jpg");
  AddImageNormalMap(mesh, "../assets/2k_earth_normal_map.png", [20, 20]);
  AddImageAO(mesh, "../assets/2k_earth_specular_map.png");

  // NIEBLA
  AddImageAlphaMap(niebla, "../assets/2k_earth_cloud.jpg");
  // niebla.material.transparent

  //Si ve menos claro entre el tuto - Es por que el Usa la version 151.3

  // console.log(mesh.material.map.source);
}

function animate() {
  stats.update();
  controls.update();

  if (mesh) {
    mesh.rotation.y += rotacion;
  }
  if (niebla) {
    niebla.rotation.y += rotacion + 0.001;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
animate();
