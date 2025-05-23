import * as THREE from "three";

import Stats from "three/addons/libs/stats.module.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { ShadowMapViewer } from "three/addons/utils/ShadowMapViewer.js";
import { create } from "../JS-Shared/threejs/Core/Escena.js";

let camera, scene, renderer, clock, stats;
let dirLight, spotLight;
let torusKnot, cube;
let dirLightShadowMapViewer, spotLightShadowMapViewer;

init();

function init() {
  initScene();
  initShadowMapViewers();
  initMisc();

  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize);
}

// --COMPRENDIDO
function initScene() {
  camera = create.camera({ pov: 45, near: 1, far: 1000 });
  camera.position.set(0, 15, 35);

  scene = create.scene();

  // Lights

  scene.add(new THREE.AmbientLight(0x404040, 3));

  spotLight = new THREE.SpotLight(0xffffff, 500);
  spotLight.name = "Spot Light";
  spotLight.angle = Math.PI / 5;
  spotLight.penumbra = 0.3;
  spotLight.position.set(10, 10, 5);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 8;
  spotLight.shadow.camera.far = 30;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  scene.add(spotLight);

  scene.add(new THREE.CameraHelper(spotLight.shadow.camera));

  dirLight = new THREE.DirectionalLight(0xffffff, 3);
  dirLight.name = "Dir. Light";
  dirLight.position.set(0, 10, 0);
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 10;
  dirLight.shadow.camera.right = 15;
  dirLight.shadow.camera.left = -15;
  dirLight.shadow.camera.top = 15;
  dirLight.shadow.camera.bottom = -15;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  scene.add(dirLight);

  scene.add(new THREE.CameraHelper(dirLight.shadow.camera));

  // Geometry
  let geometry = new THREE.TorusKnotGeometry(25, 8, 75, 20);
  let material = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 150,
    specular: 0x222222,
  });

  torusKnot = new THREE.Mesh(geometry, material);
  torusKnot.scale.multiplyScalar(1 / 18);
  torusKnot.position.y = 3;
  torusKnot.castShadow = true;
  torusKnot.receiveShadow = true;
  scene.add(torusKnot);

  geometry = new THREE.BoxGeometry(3, 3, 3);
  cube = new THREE.Mesh(geometry, material);
  cube.position.set(2, 3, 8);
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);

  geometry = new THREE.BoxGeometry(10, 0.15, 10);
  material = new THREE.MeshPhongMaterial({
    color: 0xa0adaf,
    shininess: 150,
    specular: 0x111111,
  });

  const ground = new THREE.Mesh(geometry, material);
  ground.scale.multiplyScalar(3);
  ground.castShadow = false;
  ground.receiveShadow = true;
  scene.add(ground);
}

// --COMPRENDIDO
function initMisc() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  // Mouse control
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 2, 0);
  controls.update();

  clock = new THREE.Clock();

  stats = new Stats();
  document.body.appendChild(stats.dom);
}

// ..........................
//
// ..........................

function initShadowMapViewers() {
  dirLightShadowMapViewer = new ShadowMapViewer(dirLight);
  spotLightShadowMapViewer = new ShadowMapViewer(spotLight);
  resizeShadowMapViewers();
}

function resizeShadowMapViewers() {
  const size = window.innerWidth * 0.15;

  dirLightShadowMapViewer.position.x = 10;
  dirLightShadowMapViewer.position.y = 10;
  dirLightShadowMapViewer.size.width = size;
  dirLightShadowMapViewer.size.height = size;
  dirLightShadowMapViewer.update(); //Required when setting position or size directly

  spotLightShadowMapViewer.size.set(size, size);
  spotLightShadowMapViewer.position.set(size + 20, 10);
  // spotLightShadowMapViewer.update();	//NOT required because .set updates automatically
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  resizeShadowMapViewers();
  dirLightShadowMapViewer.updateForWindowResize();
  spotLightShadowMapViewer.updateForWindowResize();
}

function animate() {
  const delta = clock.getDelta();

  //RENDER
  renderer.render(scene, camera);

  // SHADOWRENDERER
  dirLightShadowMapViewer.render(renderer);
  spotLightShadowMapViewer.render(renderer);

  torusKnot.rotation.x += 0.25 * delta;
  torusKnot.rotation.y += 2 * delta;
  torusKnot.rotation.z += 1 * delta;

  cube.rotation.x += 0.25 * delta;
  cube.rotation.y += 2 * delta;
  cube.rotation.z += 1 * delta;

  stats.update();
}
