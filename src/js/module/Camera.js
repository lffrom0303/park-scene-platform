import * as THREE from "three";

export default class Camera {
  constructor(parent, width, height) {
    parent.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    parent.camera.position.set(10, 10, 10);
    parent.camera.lookAt(parent.scene.position);
  }
}
