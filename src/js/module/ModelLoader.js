import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import DsModel from "./DsModel";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

/**
 * 模型加载类（只能加载GLTF及GLB格式）
 * 其他格式可通过windows 电脑默认模型软件打开然后另存为glb
 */
export default class ModelLoader {
  /**
   * 构造函数
   * @param _viewer
   * @param resourcesUrl
   */
  constructor(_viewer, resourcesUrl = "resources/draco/") {
    this.viewer = _viewer;
    this.scene = _viewer.scene;
    this.modelList = [];
    this.loaderGltf = new GLTFLoader(); // 实例化加载器
    this.loaderFBX = new FBXLoader(); // 实例化加载器
    this.dracoLoader = new DRACOLoader();
    // 提供一个DracLoader实例来解码压缩网格数据
    // 没有这个会报错
    this.dracoLoader.setDecoderPath(resourcesUrl); // 默认放在public文件夹当中
    this.loaderGltf.setDRACOLoader(this.dracoLoader);
    _viewer._modelLoader = this;
  }

  /**
   * 添加模型数据
   * @param urlList
   * @param callback 返回模型对象，常用一些功能挂接在模型对象上
   * @param progress 返回加载进度，还有问题，需要修改
   */
  loadModelToScene(urlList, callback, progress) {
    !Array.isArray(urlList) ? (urlList = [urlList]) : urlList;
    for (let i = 0; i < urlList.length; i++) {
      this.loadModel(
        "/resources/model/" + urlList[i],
        (model) => {
          this.scene.add(model.object);
          this.modelList.push(model.object);
          callback && callback(model);
        },
        (num) => {
          progress && progress(num); // 输出加载进度
        }
      );
    }
  }

  /**
   * 加载模型
   * @param url 模型路径
   * @param callback 回调模型
   * @param progress 返回加载进度
   */
  loadModel(url, callback, progress) {
    // .load（url:字符串，onLoad:函数，onProgress:函数，onError:函数）
    //判断是否是fbx格式
    if (url.indexOf(".fbx") > -1) {
      this.loaderFBX.load(
        url,
        (gltf) => {
          callback && callback(new DsModel(gltf, this.viewer));
        },
        (xhr) => {
          progress && progress((xhr.loaded / xhr.total).toFixed(2)); // 输出加载进度
        }
      );
    } else {
      this.loaderGltf.load(
        url,
        (gltf) => {
          callback && callback(new DsModel(gltf, this.viewer));
        },
        (xhr) => {
          progress && progress((xhr.loaded / xhr.total).toFixed(2)); // 输出加载进度
        }
      );
    }
  }
}
