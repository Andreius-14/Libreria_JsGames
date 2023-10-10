import * as THREE from "three";
import { scene,camera,renderer,controls } from "../../components/componentes_Escena"
import {worldAxis, worldGrid ,worlNiebla,worldFloor,colores} from '../../components/componentes_world.js'

animate();

const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(1, 3, 2);
dl.target.position.set(0, 0, 0)
const helper = new THREE.DirectionalLightHelper(dl); // GUI Vizualiza la Luz

worldFloor()
worlNiebla(true,colores.blue)

scene.add(dl);
scene.add(helper)
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
// const scene = new THREE.Scene();
// scene.add(new THREE.GridHelper(10, 10));
// const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
// const renderer = new THREE.WebGL1Renderer();
// renderer.setSize(640, 480, false);
// ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER
//-------- ----------
scene.add(worldGrid,worldAxis)



const makeCube = (size, x, y, z) => { 
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshNormalMaterial());
    mesh.position.set(x, y, z);
    return mesh;
};
//-------- ----------
// CREATING A GROUP
//-------- ----------
const group = new THREE.Group() , radius = 4, count = 8;
scene.add(group);
// changing position and rotation of the group
group.position.x = -2;
group.rotation.y = Math.PI / 180 * 45;
//-------- ----------
// ADDING MESH OBJECTS TO THE GROUP
//-------- ----------
group.add(makeCube(1.0, 0, 0, 0));
 group.add(makeCube(0.5, 0, 2, 0));
group.add(makeCube(0.5, 0, -2, 0));
group.add(makeCube(0.5, 2, 0, 0));
group.add(makeCube(0.5, -2, 0, 0));

// const group = new THREE.Group()
let i = 0;
while (i < count) {
    // creating a mesh
    const bx = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial()),
    r = Math.PI * 2 / count * i;
    // set position of mesh
    bx.position.set( Math.cos(r) * radius, 0, Math.sin(r) * radius);
    // add mesh to the group
    group.add(bx);
    i += 1;
}
scene.add(group);
// changing position and rotation of the group
group.position.set(-4, 0, -4);
// group.position.set(0, 0, 0);
// group.rotation.z = Math.PI / 180 * 90;
//EVENTOS
window.addEventListener("resize", onWindowResize);


// 💀 Funciones

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 💀 RENDER
function animate() {
	requestAnimationFrame( animate );
  controls.update();
  render();
}

function render () {
	renderer.render( scene, camera );
}
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
