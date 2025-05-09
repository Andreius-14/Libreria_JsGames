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
  loadCamara,
} from "../../JS-Shared/threejs/Core/Escena.js";

import {
  EventoFullScreen,
  EventoResize,
} from "../../JS-Shared/threejs/Core/Evento.js";
// Componentes Extra
import { WorldBuilder } from "../../JS-Shared/threejs/Core/World.js";

import { Luces } from "../../JS-Shared/threejs/Luces.js";
import { Mesh, geo, mat } from "../../JS-Shared/threejs/Mesh.js";
import { Texturas } from "../../JS-Shared/threejs/Texturas.js";

//----------------------------------------------------------------//
//                        VARIABLES
//----------------------------------------------------------------//

// CORE
let container, camera, scene, renderer;
// ADOON
let stats, controls;

// MODEL
let mesh, niebla;
const objetivo = [0, 0, 0];
const rotacion = 0.005;

init();

function init() {
  //----------------------------------------------------------------//
  //                        CORE
  //----------------------------------------------------------------//

  scene = createScene();
  container = createContenedor("contenedor3D");
  renderer = createRenderer({ sombra: true });

  camera = createCamara({ posicion: [1, 2, -3], objetivo: objetivo });

  // ADDON
  stats = createStats(container);
  controls = createControls(camera, renderer, { objetivo: objetivo });

  //CONFIG
  config_Estilos();
  config_Renderer(renderer, container);
  // EVENTO
  EventoResize(camera, renderer);
  EventoFullScreen(renderer);

  //----------------------------------------------------------------//
  //                        ESCENA 3D
  //----------------------------------------------------------------//
  const color = "black";

  const World = new WorldBuilder(scene);

  World.Fondo(color);
  World.Niebla(color, 10, 50);
  World.Grid();
  World.Light();
  Luces.Sol(scene, [-3, 5, -10], { generaSombra: true });

  //----------------------------------------------------------------//
  //                        GEOMETRIA - INICIO
  //----------------------------------------------------------------//

  const rutaMap = "../../assets/2k_earth_daymap.jpg";
  const rutaNmap = "../assets/2k_earth_normal_map.png";
  const rutaAO = "../../assets/2k_earth_specular_map.png";
  const rutaAM = "../../assets/2k_earth_cloud.jpg";

  mesh = Mesh.create(scene, { material: mat.Imagen() });
  niebla = Mesh.create(scene, {
    material: mat.Imagen(),
    geo: geo.Esfera(0.71),
  });

  Mesh.create(scene, { posicion: [0, 3] });
  Mesh.create(scene, { posicion: [2, 2] });
  Mesh.create(scene, { posicion: [-2, 2] });

  Texturas.AddImageMap(mesh, rutaMap);
  Texturas.AddImageNormalMap(mesh, rutaNmap, [20, 20]);
  Texturas.AddImageAO(mesh, rutaAO);
  Texturas.AddImageAlphaMap(niebla, rutaAM);
  //----------------------------------------------------------------//
  //                        GEOMETRIA - FIN
  //----------------------------------------------------------------//

  config_Animation(renderer, animate);
}

function animate() {
  mesh.rotation.y += rotacion;
  niebla.rotation.y += rotacion + 0.001;

  // Basico
  renderer.render(scene, camera); //effectComposer.render(); // Usa esto si tienes post-processing
  stats.update();
  controls.update();
}
