// Basico
import * as THREE from "three";
// Informacion de Consumo
import Stats from "three/addons/libs/stats.module.js";
// Control de Camara - Sensilla
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// Aumento de Realidad - Cuarto para el Objeto 3D
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
// Cargar Archivos
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// Optimizador de Carga
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";


// let mixer;
// const clock = new THREE.Clock();

// [🌱🌱🌱] INSTANCIA Y PROPIEDADES 

//🌱 Instancia e Propiedades [Scene - Camara - renderer]
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000,);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const pmremGenerator = new THREE.PMREMGenerator(renderer); // Cuarto - Efecto de Luz

scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set( 0, 200, 400 );
// camera.position.z = 400;


//🌱 Instancia e Propiedades [Container - Constrols]
const container = document.body || document.getElementById("container");
const controls = new OrbitControls(camera, renderer.domElement);
const stats = new Stats();

// INSERCION
container.appendChild(stats.dom);
container.appendChild(renderer.domElement);

controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;


// [🌱🌱🌱] GEOMETRIA NUEVA -- Loader

const dracoLoader = new DRACOLoader();
const loader = new GLTFLoader();
let model = null;

dracoLoader.setDecoderPath("jsm/libs/draco/gltf/");
loader.setDRACOLoader(dracoLoader);

loader.load( "../assets/cube_kirby/scene.gltf", (gltf) => { 
    model = gltf.scene;
      // Añadir recomendación para ajustar el brillo del modelo
    model.traverse((child) => {
      if (child.isMesh) {
        child.material.envMapIntensity = 0;
      }
    });
    // model.position.set(-0.5, 0.5, 0);
    // model.scale.set(0.01, 0.01, 0.01);
    
    // INSERCION
    scene.add(model);

    // mixer = new THREE.AnimationMixer(model);
    // mixer.clipAction(gltf.animations[0]).play();

    animate();
  },
  undefined, (e) => { console.error(e); },
);

// [🌱🌱🌱]  Render y Funciones

// Funcion -- Ajusta tamaño de Ventana
// Existe una forma mas sencilla en cubo-02 usa addEventListener
// window.onresize = function () {
// 	camera.aspect = window.innerWidth / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( window.innerWidth, window.innerHeight );
// };

// Funcion -- Ajusta tamaño de Ventana
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

// Funcion -- Actualiza por Segundos
function animate() {
	requestAnimationFrame( animate );
  
  // UPLOAD x SECOND
  if(model){
    // model.rotation.x += 0.01;
    model.rotation.y += 0.01;
  }
  controls.update();
	stats.update();
  // const delta = clock.getDelta();
	// mixer.update( delta );

  // INSERCION
	renderer.render( scene, camera );
}


//🌱 Tubimos q desactivar el mixer para que funcione - parece que es la animacion
// Podemos Eliminar el Cuarto de Iluminacion - Opcional
