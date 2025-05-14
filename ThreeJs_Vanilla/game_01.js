import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

import { create, config } from "./JS-Shared/threejs/Core/Escena.js";
import { WorldBuilder } from "./JS-Shared/threejs/Core/World.js";
import { evento } from "./JS-Shared/threejs/Core/Evento.js";

//----------------------------------------------------------------//
//                        VARIABLES GLOBALES
//----------------------------------------------------------------//
const objects = []; // Array para almacenar objetos con los que se puede colisionar

let raycaster; // Raycaster para detectar colisiones

// Variables de control de movimiento
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false; // Indica si el jugador puede saltar

// Variables para el cálculo de física
let prevTime = performance.now(); // Para calcular el tiempo entre frames
const velocity = new THREE.Vector3(); // Velocidad actual del jugador
const direction = new THREE.Vector3(); // Dirección del movimiento
const vertex = new THREE.Vector3(); // Variable temporal para manipular vértices
const color = new THREE.Color(); // Variable temporal para manipular colores

let controls; // Controles de movimiento en primera persona

//----------------------------------------------------------------//
//                        CONFIGURACIÓN INICIAL
//----------------------------------------------------------------//
// Creación de cámara, escena y renderer usando funciones del módulo Escena.js
const camera = create.camera({ pov: 75, near: 1, far: 1000 });
const scene = create.scene();
const renderer = create.renderer();

// Configuración inicial
config.Estilos(); // Aplica estilos CSS necesarios
config.Renderer(renderer, document.body); // Configura el renderer en el documento
config.Animation(renderer, animate); // Inicia el bucle de animación

// Posición inicial de la cámara
camera.position.y = 10;

// Configura el evento de redimensionado de la ventana
evento.Resize(camera, renderer);

// Elementos del DOM para la interfaz
const blocker = document.getElementById("blocker"); // Elemento que bloquea la interacción
const instructions = document.getElementById("instructions"); // Instrucciones para el usuario

//----------------------------------------------------------------//
//                          CONSTRUCCIÓN DEL MUNDO
//----------------------------------------------------------------//
const World = new WorldBuilder(scene);
World.SkyPiso([0.5, 1, 0.75]); // Configura el cielo y el piso
World.Fog(0, 750, 0xffffff); // Opcional: configura niebla
World.Bg(0xffffff); // Opcional: configura color de fondo

//----------------------------------------------------------------//
//                          INICIALIZACIÓN
//----------------------------------------------------------------//
init();

function init() {
  //----------------------------------------------------------------//
  //                          CONTROLES - PRIMERA PERSONA
  //----------------------------------------------------------------//
  controls = new PointerLockControls(camera, document.body);

  // Evento para iniciar los controles al hacer click en las instrucciones
  instructions.addEventListener("click", function () {
    controls.lock();
  });

  // Evento cuando se activa el pointer lock
  controls.addEventListener("lock", function () {
    instructions.style.display = "none";
    blocker.style.display = "none";
  });

  // Evento cuando se desactiva el pointer lock
  controls.addEventListener("unlock", function () {
    blocker.style.display = "block";
    instructions.style.display = "";
  });

  // Añade el objeto de controles a la escena
  scene.add(controls.object);

  //----------------------------------------------------------------//
  //                          CONTROLES DE TECLADO
  //----------------------------------------------------------------//
  const onKeyDown = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW": // Tecla W o flecha arriba - mover adelante
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA": // Tecla A o flecha izquierda - mover izquierda
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS": // Tecla S o flecha abajo - mover atrás
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD": // Tecla D o flecha derecha - mover derecha
        moveRight = true;
        break;

      case "Space": // Barra espaciadora - saltar
        if (canJump === true) velocity.y += 350; // Aplica fuerza de salto
        // canJump = false; // Evita saltos múltiples
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  // Asigna los event listeners para teclado
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  //----------------------------------------------------------------//
  //                          CONFIGURACIÓN DE COLISIONES
  //----------------------------------------------------------------//
  raycaster = new THREE.Raycaster(
    new THREE.Vector3(), // Origen del rayo (se actualizará cada frame)
    new THREE.Vector3(0, -1, 0), // Dirección del rayo (hacia abajo)
    0, // Distancia mínima
    10, // Distancia máxima
  );

  //----------------------------------------------------------------//
  //                          CREACIÓN DEL PISO
  //----------------------------------------------------------------//
  let position;
  World.Floor(undefined, 2000);
  // let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
  // floorGeometry.rotateX(-Math.PI / 2); // Rota el plano para que sea horizontal
  //
  // // Modifica los vértices del piso para crear variación
  // let position = floorGeometry.attributes.position;
  //
  // for (let i = 0, l = position.count; i < l; i++) {
  //   vertex.fromBufferAttribute(position, i);
  //   // Aplica desplazamiento aleatorio a cada vértice
  //   vertex.x += Math.random() * 20 - 10;
  //   vertex.y += Math.random() * 2;
  //   vertex.z += Math.random() * 20 - 10;
  //   position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  // }
  //
  // // Convierte la geometría a non-indexed para tener vértices únicos
  // floorGeometry = floorGeometry.toNonIndexed();
  //
  // // Asigna colores aleatorios a cada vértice del piso
  // position = floorGeometry.attributes.position;
  // const colorsFloor = [];
  //
  // for (let i = 0, l = position.count; i < l; i++) {
  //   color.setHSL(
  //     Math.random() * 0.3 + 0.5, // Tono
  //     0.75, // Saturación
  //     Math.random() * 0.25 + 0.75, // Luminosidad
  //     THREE.SRGBColorSpace,
  //   );
  //   colorsFloor.push(color.r, color.g, color.b);
  // }
  //
  // // Añade los colores como atributo de la geometría
  // floorGeometry.setAttribute(
  //   "color",
  //   new THREE.Float32BufferAttribute(colorsFloor, 3),
  // );
  //
  // // Crea el mesh del piso con colores por vértice
  // const floor = new THREE.Mesh(
  //   floorGeometry,
  //   new THREE.MeshBasicMaterial({ vertexColors: true }),
  // );
  // scene.add(floor);
  //
  //----------------------------------------------------------------//
  //                          CREACIÓN DE OBJETOS (CAJAS)
  //----------------------------------------------------------------//
  const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();

  // Asigna colores aleatorios a cada vértice de las cajas
  position = boxGeometry.attributes.position;
  const colorsBox = [];

  for (let i = 0, l = position.count; i < l; i++) {
    color.setHSL(
      Math.random() * 0.3 + 0.5,
      0.75,
      Math.random() * 0.25 + 0.75,
      THREE.SRGBColorSpace,
    );
    colorsBox.push(color.r, color.g, color.b);
  }

  boxGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colorsBox, 3),
  );

  // Crea 500 cajas en posiciones aleatorias
  for (let i = 0; i < 500; i++) {
    const boxMaterial = new THREE.MeshPhongMaterial({
      specular: 0xffffff, // Brillo especular
      flatShading: true, // Sombreado plano
      vertexColors: true, // Usa colores por vértice
    });

    // Color base aleatorio para la caja
    boxMaterial.color.setHSL(
      Math.random() * 0.2 + 0.5,
      0.75,
      Math.random() * 0.25 + 0.75,
      THREE.SRGBColorSpace,
    );

    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    // Posición aleatoria para la caja
    box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
    box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
    box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

    scene.add(box);
    objects.push(box); // Añade la caja al array de objetos colisionables
  }
}

//----------------------------------------------------------------//
//                          BUCLE DE ANIMACIÓN
//----------------------------------------------------------------//
function animate() {
  const time = performance.now();

  // Solo actualiza si los controles están activos
  if (controls.isLocked === true) {
    // Configura el rayo para detección de colisiones (apuntando hacia abajo desde la cámara)
    raycaster.ray.origin.copy(controls.object.position);
    raycaster.ray.origin.y -= 10; // Ajusta la posición del rayo

    // Detecta colisiones con objetos
    const intersections = raycaster.intersectObjects(objects, false);
    const onObject = intersections.length > 0; // ¿Está el jugador sobre un objeto?

    // Calcula el tiempo transcurrido desde el último frame (en segundos)
    const delta = (time - prevTime) / 1000;

    // Aplica fricción al movimiento horizontal
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    // Aplica gravedad (masa = 100.0)
    velocity.y -= 9.8 * 100.0 * delta;

    // Calcula la dirección del movimiento basado en las teclas presionadas
    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // Normaliza para mantener velocidad constante en diagonales

    // Aplica fuerza de movimiento según las teclas
    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    // Si está sobre un objeto, permite saltar y elimina velocidad vertical negativa
    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    // Mueve al jugador según la velocidad calculada
    controls.moveRight(-velocity.x * delta); // Movimiento horizontal (eje X)
    controls.moveForward(-velocity.z * delta); // Movimiento frontal (eje Z)
    controls.object.position.y += velocity.y * delta; // Movimiento vertical (eje Y)

    // Limita la posición mínima en Y (evita caer indefinidamente)
    if (controls.object.position.y < 10) {
      velocity.y = 0;
      controls.object.position.y = 10;
      canJump = true;
    }
  }

  // Actualiza el tiempo del último frame
  prevTime = time;

  // Renderiza la escena
  renderer.render(scene, camera);
}
