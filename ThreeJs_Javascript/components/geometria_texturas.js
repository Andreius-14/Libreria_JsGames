import * as THREE from "three";
import { scene } from './componentes_Escena_I.js'

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// // const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } ); //!Sombra
// // const material = new THREE.MeshStandardMaterial( { color: 0x44aa88 } ); //Sombra
// const material = new THREE.MeshNormalMaterial(); //Drogas

// export const cube = new THREE.Mesh(geometry, material);

// OBJETOS - VARIABLES
export const text = {
    color: new THREE.MeshBasicMaterial({ color: 0x44aa88 }),
    Sombra: new THREE.MeshStandardMaterial(),
    Drogas: new THREE.MeshNormalMaterial(),
    recibeSombra: new THREE.ShadowMaterial(),
    imagen:new THREE.TextureLoader(),
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
export const geometria3D = (geometria=geo.Esfera, textura=text.Drogas ,posicion=[0,0,0] ,color=0x00ff00,escena = scene ) => {
    const objeto = new THREE.Mesh(geometria, textura);
    objeto.position.set(...posicion)
    if (textura!=text.Drogas){
        objeto.material.color.set(color)
    }
    escena.add(objeto);
    return objeto;

}

export const geo3DImage = (geometria=geo.Esfera, ruta="" ,posicion=[0,0,0])=>{
    const textura = text.imagen.load(ruta)
    const material = text.Sombra;
    material.map = textura;
    
    const objeto = new THREE.Mesh(geometria, material);
    objeto.position.set(...posicion)

    scene.add(objeto);
    console.log(objeto);
    return objeto;
}