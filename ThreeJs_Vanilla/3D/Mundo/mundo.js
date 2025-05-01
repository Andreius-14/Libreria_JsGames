/* eslint-disable no-unused-vars */
//import * as THREE from "three";

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
import { Texturas } from "../../JS-Shared/threejs/Texturas.js";
import {
  geometria3D,
  geo,
  materiales,
} from "../../JS-Shared/threejs/Geometria.js";

import { worldColor } from "../../JS-Shared/Shared-Const.js";

//----------------------------------------------------------------//
//                        VARIABLES
//----------------------------------------------------------------//
let mesh = "";
let niebla = "";
const rotacion = 0.005;

function init() {
  // ESCENARIO
  World.Light(scene);
  World.Grid(scene);

  // LUCES
  Luces.Sol(scene, [5, 0, 0]);

  //----------------------------------------------------------------//
  //                        OBJETOS
  //----------------------------------------------------------------//

  mesh = geometria3D(scene, { material: materiales.recibeImagen() });
  niebla = geometria3D(scene, {
    geometria: geo.Esfera(0.72),
    material: materiales.recibeImagen(),
  });

  geometria3D(scene, { material: materiales.Sombra(), posicion: [0, 3] });
  geometria3D(scene, { material: materiales.Sombra(), posicion: [2, 2] });
  geometria3D(scene, { posicion: [-2, 2], color: worldColor.blue });
  //----------------------------------------------------------------//
  //                      PROPIEDADES
  //----------------------------------------------------------------//

  // MESH
  Texturas.AddImageMap(mesh, "../../assets/2k_earth_daymap.jpg");
  Texturas.AddImageNormalMap(
    mesh,
    "../assets/2k_earth_normal_map.png",
    [20, 20],
  );
  Texturas.AddImageAO(mesh, "../../assets/2k_earth_specular_map.png");

  // NIEBLA
  Texturas.AddImageAlphaMap(niebla, "../../assets/2k_earth_cloud.jpg");
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

  // Obsoleto usar settAnimationLoop fuera de esta function
  requestAnimationFrame(animate);

  //Solo 1 Valido
  renderer.render(scene, camera);
  //effectComposer.render(); // Usa esto si tienes post-processing
}

init();
animate();
