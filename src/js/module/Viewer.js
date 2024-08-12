import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import Scene from "./Scene.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
export default class Scene3d {
  constructor(id, options = {}) {
    this.id = id;
    this.initOptions(options);
    this.init();
  }
  init() {
    let dom = document.getElementById(this.id);
    this.dom = dom;
    if (!dom) {
      throw new Error(`${this.id} is not found`);
    }
    let { width, height } = this.getDomWidthAndHeight();
    //scene
    new Scene(this);
    //camera
    new Camera(this, width, height);
    //renderer
    new Renderer(this, width, height, this.dom);
    //orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //stats
    if (this.options.isStat) {
      this.stat = new Stats();
      dom.appendChild(this.stat.domElement);
    }
    //axes
    if (this.options.isAxesHelper) {
      this.axesHelper = new THREE.AxesHelper(5);
      this.scene.add(this.axesHelper);
    }
    //skyBox

    //resize
    window.addEventListener("resize", this.onWindowResize.bind(this));
  }
  initOptions(options) {
    this.options = {
      isStat: false,
      isAxesHelper: false,
      isClick: false,
      ...options,
    };
  }
  destroy() {
    this.scene.traverse((child) => {
      if (child.material) {
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
      child = null;
    });
    this.renderer.forceContextLoss();
    this.renderer.dispose();
    this.scene.clear();
  }
  animate() {
    this.controls && this.controls.update();
    this.stat && this.stat.update();
    this.renderer.render(this.scene, this.camera);
  }
  getDomWidthAndHeight() {
    return {
      width: this.dom.clientWidth || window.innerWidth,
      height: this.dom.clientHeight || window.innerHeight,
    };
  }
  onWindowResize() {
    let { width, height } = this.getDomWidthAndHeight();
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
