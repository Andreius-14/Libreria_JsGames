// Components
import { camera, scene, renderer } from "../components/componentes_Escena_I"
import { stats, controls ,background} from "../components/componentes_Escena_II"

import { worldAxis, worldGrid, worldcolor, worldFloor, worlNiebla } from "../components/componentes_world"
import { Luz } from "../components/componentes_luces";
import { geometria3D, text } from "../components/geometria_texturas"

init();
animate();


function init() {

  //🌱 PROPIEDADES
  // controls.autoRotate = true;
  background()

  //🌱 INSERTAR
  geometria3D(undefined, text.Sombra);

  worldGrid();
  worldAxis();
  // worldFloor()
  worlNiebla()

  // worldLight()
  Luz(worldcolor.orange,undefined, [-2, 2, 0], [0, 0, 0], true);
  // Luz(undefined,undefined,[2,2,0])
}


// 💀 Funciones Especiales

function animate() {
  requestAnimationFrame(animate);
  stats.update();
  controls.update();
  
  renderer.render(scene, camera);
}

