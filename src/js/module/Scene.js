import * as THREE from "three";

export default class Scene {
  constructor(_viewer) {
    this._viewer = _viewer;
    this.addScene();
  }
  addScene() {
    this._viewer.scene = new THREE.Scene();
    // parent.scene.background = new THREE.Color(0x000000);
  }
}
