/* eslint-disable no-unused-vars */
//import * as THREE from "three";

import {
  config_Animation,
  config_Estilos,
  config_Renderer,
  createCamara,
  createContenedor,
  createControls,
  createRenderer,
  createScene,
  createStats,
} from "../../JS-Shared/threejs/Escena.js";

import {
  EventoFullScreen,
  EventoResize,
} from "../../JS-Shared/threejs/Evento.js";
// Componentes Extra
import { World } from "../../JS-Shared/threejs/World.js";
import { Luces } from "../../JS-Shared/threejs/Luces.js";
import { Texturas } from "../../JS-Shared/threejs/Texturas.js";
import {
  geometria3D,
  geo,
  materiales,
} from "../../JS-Shared/threejs/Geometria.js";

//----------------------------------------------------------------//
//                        VARIABLES
//----------------------------------------------------------------//

// CORE
let container, camera, scene, renderer;
// ADOON
let stats, controls;

// MODEL
let mesh = "";
let niebla = "";
const objetivo = [0, 0, 0];
const rotacion = 0.005;

init();

function init() {
  //----------------------------------------------------------------//
  //                        CORE
  //----------------------------------------------------------------//

  scene = createScene();
  container = createContenedor("contenedor3D");
  camera = createCamara({ posicion: [1, 2, -3], objetivo: objetivo });
  renderer = createRenderer({ sombra: true });

  // ADDON
  stats = createStats(container);
  controls = createControls(camera, renderer, { objetivo: objetivo });

  //CONFIG
  config_Estilos();
  config_Renderer(renderer, container);
  config_Animation(renderer, animate);
  // EVENTO
  EventoResize(camera, renderer);
  EventoFullScreen(renderer);

  //----------------------------------------------------------------//
  //                        ESCENA 3D
  //----------------------------------------------------------------//

  World.Background(scene, 0xa0a0a0);
  World.Niebla(scene, 0xa0a0a0, 10, 50);
  World.Grid(scene);
  Luces.Sol(scene, [-3, 5, -10], { generaSombra: true });

  //----------------------------------------------------------------//
  //                        GEOMETRIA
  //----------------------------------------------------------------//

  mesh = geometria3D(scene, { material: materiales.recibeImagen() });
  niebla = geometria3D(scene, {
    geometria: geo.Esfera(0.72),
    material: materiales.recibeImagen(),
  });

  geometria3D(scene, { material: materiales.Sombra(), posicion: [0, 3] });
  geometria3D(scene, { material: materiales.Sombra(), posicion: [2, 2] });
  geometria3D(scene, { posicion: [-2, 2] });

  //----------------------------------------------------------------//
  //                      Texturas
  //----------------------------------------------------------------//

  Texturas.AddImageMap(mesh, "../../assets/2k_earth_daymap.jpg");
  Texturas.AddImageNormalMap(mesh, "../assets/2k_earth_normal_map.png");
  Texturas.AddImageAO(mesh, "../../assets/2k_earth_specular_map.png");
  Texturas.AddImageAlphaMap(niebla, "../../assets/2k_earth_cloud.jpg");
}

function animate() {
  if (mesh && niebla) {
    mesh.rotation.y += rotacion;
    niebla.rotation.y += rotacion + 0.001;
  }

  // Basico
  renderer.render(scene, camera); //effectComposer.render(); // Usa esto si tienes post-processing
  stats.update();
  controls.update();
}
