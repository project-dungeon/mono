import * as THREE from "three";
import Controller from "./controller";

export default class SceneController extends Controller {
  static #scene = new THREE.Scene();
  static #renderer = new THREE.WebGLRenderer();
  static #camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  static {
    SceneController.scene.background = new THREE.Color(0xffffff);
    SceneController.#renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(SceneController.#renderer.domElement);
    SceneController.#camera.position.set(0, 0, 10);
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    SceneController.scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(3, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    SceneController.scene.add(dirLight);
  }

  static get scene() {
    return SceneController.#scene;
  }

  static get renderer() {
    return SceneController.#renderer;
  }

  static get camera() {
    return SceneController.#camera;
  }

  static update() {
    SceneController.#renderer.render(
      SceneController.#scene,
      SceneController.#camera
    );
  }
}
