import * as THREE from 'three';

// Basico 
import {scene,camera,renderer} from '../components/componentes_Escena_I.js'
import {stats,controls,background} from '../components/componentes_Escena_II.js'
// Complementos
import {worldAxis,worldGrid,worldFloor,worlNiebla,worldcolor} from "../components/componentes_world.js";
import {geometria3D,geo,text} from "../components/geometria_texturas.js";
import {helper,light,Luz} from "../components/componentes_luces.js"

// CONSTANTES
const group = new THREE.Group()


//FUNCIONES
function init() {

// PROPIEDADES
// scene.background = new THREE.Color( worldcolor.grey );
background()

// INSERCION WORLD

worldFloor()
worlNiebla()
worldGrid()
worldAxis()

// INSERCION LUCES
scene.add(light, helper);
Luz(worldcolor.gray,1,[-2,2,0],undefined)

// INSERCION GEOMEATRIA [Se puede Agrupar]

group.add(geometria3D(geo.cubo,text.Sombra))
group.add(geometria3D(geo.toru))
group.add(geometria3D(geo.Capsula,text.Sombra,[3,3,1]))

scene.add(group);


}

// 🌱 Render [Especial se ejecuta continuamente]
function animate() {
	requestAnimationFrame( animate );
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;

    group.children.forEach((objeto,indice) => {
      // Realiza alguna acción en cada objeto
      let i = (indice+1)
      objeto.rotation.x += i * 0.01;
      objeto.rotation.y += i * 0.01;
  });

  stats.update()
  controls.update();
	renderer.render( scene, camera );
}

init();
animate();


// 🌱 En cubo-01 la camara se desplaza en PLANO CARTESIOANO 
// 🌱 En load-Completo rota sobre el objeto 3d

// 🌱 EL cubo no tiene sombras pero el piso si
