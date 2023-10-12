import * as THREE from "three";

// Basico 
import {scene,camera,renderer} from '../components/componentes_Escena_I.js'
import {stats,controls,background} from '../components/componentes_Escena_II.js'
// Componentes Extra
import { worldcolor } from "../components/componentes_world.js";
import {worldLight , Luz } from "../components/componentes_luces";
import { geometria3D,geo3DImage ,geo,text} from "../components/geometria_texturas.js";

function init () {

// ESCENARIO
// background(worldcolor.dark_gray);
worldLight(worldcolor.dark_gray)


// LUCES - GEOMETRIS
Luz(undefined,0.5,[0,5,0])
// geometria3D(undefined,text.Sombra)
geo3DImage(undefined,"../assets/2k_earth_daymap.jpg")
}

function animate () {
    stats.update();
    controls.update();

    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

init();
animate();