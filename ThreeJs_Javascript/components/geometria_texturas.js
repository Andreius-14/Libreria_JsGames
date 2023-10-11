import * as THREE from "three";
import { scene } from './componentes_Escena_I.js'
import { worldcolor} from './componentes_world.js';

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } ); //!Sombra
// // const material = new THREE.MeshStandardMaterial( { color: 0x44aa88 } ); //Sombra
// const material = new THREE.MeshNormalMaterial(); //Drogas

// export const cube = new THREE.Mesh(geometry, material);

// OBJETOS - VARIABLES
export const text = {
    color: new THREE.MeshBasicMaterial({ color: 0x44aa88 }),
    Sombra: new THREE.MeshStandardMaterial({ color: 0x44aa88 }),
    Drogas: new THREE.MeshNormalMaterial(),
    recibeSombra: new THREE.ShadowMaterial(),
    // Agrega Mas
};

export const geo = {
    Esfera: new THREE.SphereGeometry(0.7, 32, 16),
    Capsula: new THREE.CapsuleGeometry(1,1,4,30),
    Cilindro: new THREE.CylinderGeometry(0.5, 0.5, 2, 32),
    cubo: new THREE.BoxGeometry(1, 1, 1),
    toru: new THREE.TorusGeometry( 2, 0.5, 16, 50 ),
    plano: new THREE.PlaneGeometry(),
    // Agrega Mas [Completo]
};

// FUNCIONES
export const geometria3D = (geometria=geo.Esfera, textura=text.Drogas ,posicion=[0,0,0] ,color=worldcolor.verdeOscuro,escena = scene ) => {
    const objeto = new THREE.Mesh(geometria, textura);
    objeto.position.set(...posicion)
    if (textura!=text.Drogas){
        objeto.material.color.set(color)
    }
    escena.add(objeto);
    return objeto;

}
