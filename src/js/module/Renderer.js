import * as THREE from "three";

export default class Renderer {
  constructor(_viewer, width, height, dom) {
    this._viewer = _viewer;
    this.addRenderer(width, height, dom);
  }
  addRenderer(width, height, dom) {
    this._viewer.renderer = new THREE.WebGLRenderer({ antialias: true });
    this._viewer.renderer.setSize(width, height);
    this._viewer.renderer.setPixelRatio(dom.devicePixelRatio);
    this._viewer.renderer.setAnimationLoop(
      this._viewer.animate.bind(this._viewer)
    );
    dom.appendChild(this._viewer.renderer.domElement);
  }
}
