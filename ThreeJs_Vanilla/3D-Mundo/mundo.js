/* eslint-disable no-unused-vars */
//import * as THREE from "three";

// Basico
import { scene, camera, renderer } from "../JS-Shared/threejs_Escena_I.js";
import {
  stats,
  controls,
  //background,
} from "../JS-Shared/threejs_Escena_II.js";
// Componentes Extra
import { worldGrid } from "../JS-Shared/threejs_world.js";
import { worldLight, Luz } from "../JS-Shared/threejs_luces.js";
import { geometria3D, geo, text } from "../JS-Shared/threejs_texturas.js";
import {
  geo3DImage,
  AddImageNormal,
  AddImageAO,
  AddImageAlphaMap,
} from "../JS-Shared/threejs_texturas.js";

import { worldColor } from "../JS-Shared/Shared-Const.js";

let mesh = "";
var niebla = "";
// camera.position.set(0, 0, 5);

// ESCENARIO
// background(worldcolor.dark_gray);
worldLight(worldcolor.dark_gray);
worldGrid();
// camera.position.set(0,0,0)

// LUCES - GEOMETRIS
// Luz(worldcolor.red,0.5,[-5,0,0],undefined,true)
Luz(undefined, 1, [3, 0, 0]);

let valor1 = geometria3D(undefined, text.Sombra(), [0, 3], worldcolor.brown);
let valor2 = geometria3D(undefined, text.Sombra(), [2, 2]);
let valor3 = geometria3D(undefined, undefined, [-2, 2], worldcolor.blue);

// geometria3D(geo.Capsula(),text.Sombra,[0,4,0])

mesh = geo3DImage(geo.Esfera(), "../assets/2k_earth_daymap.jpg");
AddImageNormal(mesh, "../assets/2k_earth_normal_map.png");
AddImageAO(mesh, "../assets/2k_earth_specular_map.png");

// scene.add(mesh)
// niebla.material.transparent

//Si ve menos claro entre el tuto - Es por que el Usa la version 151.3
niebla = geo3DImage(geo.Esfera(0.71), "", [0, 0, 0]);
AddImageAlphaMap(niebla, "../assets/2k_earth_cloud.jpg");

// console.log(mesh.material.map.source);
let rotacion = 0.005;

function animate() {
  stats.update();
  controls.update();

  if (mesh) {
    mesh.rotation.y += rotacion;
  }
  if (niebla) {
    niebla.rotation.y += rotacion;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// init();
animate();
