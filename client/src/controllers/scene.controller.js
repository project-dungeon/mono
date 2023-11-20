import * as THREE from "three";
import Controller from "./controller";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export default class SceneController extends Controller {
  static #scene = new THREE.Scene();
  static #renderer = new THREE.WebGLRenderer();
  static #camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  static #controls;
  static {
    SceneController.scene.background = new THREE.Color(0xffffff);
    SceneController.#renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(SceneController.#renderer.domElement);
    SceneController.#camera.position.set(0, 0, 10);
    SceneController.#controls = new OrbitControls(
      SceneController.#camera,
      SceneController.#renderer.domElement
    );
    SceneController.#controls.listenToKeyEvents(window);
    SceneController.#controls.maxPolarAngle = Math.PI / 2;
    SceneController.#controls.keyPanSpeed = 25;
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

  static get controls() {
    return SceneController.#controls;
  }

  static update() {
    SceneController.#controls.update();
    SceneController.#renderer.render(
      SceneController.#scene,
      SceneController.#camera
    );
  }
}
