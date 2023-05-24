import * as THREE from "three";
export const worldLight = new THREE.AmbientLight(0x404040);

export const light = new THREE.DirectionalLight(0xffffff,1);
light.position.set(2, 2, 1);
light.target.position.set(0, 0, 0)

export const helper = new THREE.DirectionalLightHelper(light); // GUI Vizualiza la Luz


