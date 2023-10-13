/* eslint-disable no-unused-vars */
import * as THREE from "three";

// Basico 
import { scene, camera, renderer } from '../components/componentes_Escena_I.js'
import { stats, controls, background } from '../components/componentes_Escena_II.js'
// Componentes Extra
import { worldGrid, worldcolor } from "../components/componentes_world.js";
import { worldLight, Luz } from "../components/componentes_luces";
import { geometria3D, geo, text } from "../components/geometria_texturas.js";
import { geo3DImage,AddImageNormal, AddImageAmbientOcclusion, AddImageAlphaMap } from "../components/geometria_texturas.js";

let mesh = "";
var niebla = "";
// camera.position.set(0, 0, 5);

// ESCENARIO
// background(worldcolor.dark_gray);
worldLight(worldcolor.dark_gray)
worldGrid()
Luz(worldcolor.red,1,[-5,0,0],undefined,true)
// camera.position.set(0,0,0)

// LUCES - GEOMETRIS
Luz(undefined, 1, [5, 0, 0])

let valor1 = geometria3D(undefined,text.Sombra(),[0,3], worldcolor.brown)
let valor2 = geometria3D(undefined,text.Sombra(),[2,2])
let valor3 = geometria3D(undefined,undefined,[-2,2],worldcolor.blue)


// geometria3D(geo.Capsula(),text.Sombra,[0,4,0])

mesh = geo3DImage(geo.Esfera(), "../assets/2k_earth_daymap.jpg")
AddImageNormal(mesh, "../assets/2k_earth_normal_map.png")
AddImageAmbientOcclusion(mesh, "../assets/2k_earth_specular_map.png")

// scene.add(mesh)
// niebla.material.transparent

niebla = geo3DImage(geo.Esfera(0.71),"",[0,0,0]);
AddImageAlphaMap(niebla,"../assets/2k_earth_cloud.jpg")

// console.log(mesh.material.map.source);


function animate() {
    stats.update();
    controls.update();

    if (mesh) {
        mesh.rotation.y += 0.001;
    }
    if (niebla) {
        niebla.rotation.y -= 0.0005;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// init();
animate();