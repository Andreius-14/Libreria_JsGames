//----------------------------------------------------------------//
//                        Import
//----------------------------------------------------------------//
import * as THREE from "three";
import {
  createScene,
  createRenderer,
  createContenedor,
  createCamara,
  config_Estilos,
  config_Renderer,
  config_Animation,
  createStats,
  createControls,
} from "../JS-Shared/threejs/Escena.js";

import { World } from "../JS-Shared/threejs/World.js";
import { Luces } from "../JS-Shared/threejs/Luces.js";

import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import { EventoFullScreen, EventoResize } from "../JS-Shared/threejs/Evento.js";
import { cargarModeloGlb } from "../JS-Shared/threejs/Texturas.js";

//----------------------------------------------------------------//
//                        VARIABLES
//----------------------------------------------------------------//
let container, stats, clock, gui, mixer, actions, activeAction, previousAction;
let camera, scene, renderer, model, face, controls;

const api = { state: "Walking" };

init();

async function init() {
  // CORE
  container = createContenedor("Contenedor");
  camera = createCamara();
  scene = createScene();
  renderer = createRenderer();

  // ADDON
  stats = createStats(container);
  controls = createControls(camera, renderer, { objetivo: [0, 2, 0] });

  clock = new THREE.Clock(); // NUEVO

  // CONFIG
  config_Estilos();
  config_Renderer(renderer, container);
  config_Animation(renderer, animate);

  // EVENTO
  EventoResize(camera, renderer);
  EventoFullScreen(renderer);

  // ESCENA
  World.Background(scene, 0xe0e0e0);
  World.Niebla(scene, 0xe0e0e0, 20, 100);
  World.HemisphereLight(scene);
  World.Floor(scene, 0xcbcbcb, 2000);
  World.Grid(scene, 200, 40);
  Luces.Direccional(scene, [0, 20, 10]);

  // model - NUEVO AQUI - Modularizado Ya

  const [modelo, animaciones] = await cargarModeloGlb(
    "./RobotExpressive/RobotExpressive.glb",
  );
  scene.add(modelo);
  createGUI(modelo, animaciones);
}
//----------------------------------------//
//            Function
//----------------------------------------//

function createGUI(model, animations) {
  //----------------------------------------------------------------//
  //                      VARIABLES - GUI
  //----------------------------------------------------------------//

  // GUI - Array
  const states = [
    "Idle",
    "Walking",
    "Running",
    "Dance",
    "Death",
    "Sitting",
    "Standing",
  ];
  // GUI - Array
  const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];
  actions = {};

  //----------------------------------------------------------------//
  //                        VARIABLES
  //----------------------------------------------------------------//
  // Instancia
  mixer = new THREE.AnimationMixer(model);

  // Recorre Animaciones
  for (let i = 0; i < animations.length; i++) {
    //--> Selecciona la Primera Animacion
    const clip = animations[i];
    //--> Carga Animacion
    const action = mixer.clipAction(clip);
    actions[clip.name] = action;

    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
    }
  }

  activeAction = actions["Walking"];
  activeAction.play();

  //----------------------------------------------------------------//
  //                        GUI - STATES
  //----------------------------------------------------------------//

  face = model.getObjectByName("Head_4");

  // GUI - Variables
  gui = new GUI();
  const statesFolder = gui.addFolder("States");
  const emoteFolder = gui.addFolder("Emotes");
  const expressionFolder = gui.addFolder("Expressions");

  statesFolder.open();
  emoteFolder.open();
  expressionFolder.open();

  // GUI - Insertar Valores
  const clipCtrl = statesFolder.add(api, "state").options(states);
  const expressions = Object.keys(face.morphTargetDictionary);

  // GUI - FOR
  for (let i = 0; i < expressions.length; i++) {
    expressionFolder
      .add(face.morphTargetInfluences, i, 0, 1, 0.01)
      .name(expressions[i]);
  }
  for (let i = 0; i < emotes.length; i++) {
    createEmoteCallback(emotes[i]);
  }

  // Animacion - Cambio
  clipCtrl.onChange(function () {
    fadeToAction(api.state, 0.5);
  });

  //----------------------------------------------------------------//
  //                        EMOTES
  //----------------------------------------------------------------//

  function createEmoteCallback(name) {
    api[name] = function () {
      fadeToAction(name, 0.2);
      mixer.addEventListener("finished", restoreState);
    };
    emoteFolder.add(api, name);
  }

  function restoreState() {
    mixer.removeEventListener("finished", restoreState);
    fadeToAction(api.state, 0.2);
  }
}
//----------------------------------------//
//            Function
//----------------------------------------//
function fadeToAction(name, duration) {
  previousAction = activeAction;
  activeAction = actions[name];

  if (previousAction !== activeAction) {
    previousAction.fadeOut(duration);
  }

  activeAction
    .reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(duration)
    .play();
}
//----------------------------------------//
//            Function
//----------------------------------------//
function animate() {
  const dt = clock.getDelta();

  if (mixer) mixer.update(dt);

  renderer.render(scene, camera);

  stats.update();
  controls.update();
}
