import * as THREE from "three";

export default class Scene {
  constructor(parent) {
    parent.scene = new THREE.Scene();
    parent.scene.background = new THREE.Color(0x000000);
  }
}
