import * as THREE from "three";

export default class Renderer {
  constructor(parent, width, height, dom) {
    parent.renderer = new THREE.WebGLRenderer({ antialias: true });
    parent.renderer.setSize(width, height);
    parent.renderer.setPixelRatio(dom.devicePixelRatio);
    parent.renderer.setAnimationLoop(parent.animate.bind(parent));
    dom.appendChild(parent.renderer.domElement);
  }
}
