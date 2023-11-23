import Controller from "./controller";
import SceneController from "./scene.controller";
import GameObjectsController from "./game-objects.controller";
import KeyboardController from "./keyboard.controller";
import getPlayer from "../utils/get-player";

export default class CameraController extends Controller {
  static #camera;
  static #target;
  static #zoom = 10;
  static #theta = 0; // Angle around the sphere
  static #phi = 1.3; // Angle for moving up and down
  static #controlsEnabled = true;

  static update() {
    // Ensure the camera is initialized
    if (!this.#camera) {
      this.#camera = SceneController.camera;
    }

    if (!this.#target) {
      const playerObject = getPlayer();
      if (!playerObject) {
        return;
      }
      this.#target = playerObject.gameObject.position;
    }

    if (!this.#controlsEnabled) {
      return;
    }

    // Update camera position based on input
    if (KeyboardController.isPressed("ArrowUp")) {
      this.#phi = Math.max(
        Math.max(this.#phi - 0.01, -Math.PI / 2 + 0.01),
        0.01
      );
    } else if (KeyboardController.isPressed("ArrowDown")) {
      this.#phi = Math.min(this.#phi + 0.01, Math.PI / 2 - 0.01);
    }

    if (this.#phi < 0) {
      return;
    }

    // Update camera left/right rotation based on input
    if (KeyboardController.isPressed("ArrowLeft")) {
      this.#theta += 0.05;
    } else if (KeyboardController.isPressed("ArrowRight")) {
      this.#theta -= 0.05;
    }

    // Update camera zoom based on input
    if (
      KeyboardController.isPressed("=") ||
      KeyboardController.isPressed("+")
    ) {
      this.#zoom = Math.max(0.1, this.#zoom - 0.1);
    } else if (KeyboardController.isPressed("-")) {
      this.#zoom += 0.1;
    }

    // Update camera position on the sphere
    const x =
      this.#target.x + this.#zoom * Math.sin(this.#phi) * Math.cos(this.#theta);
    const y = this.#target.y + this.#zoom * Math.cos(this.#phi);
    const z =
      this.#target.z + this.#zoom * Math.sin(this.#phi) * Math.sin(this.#theta);

    this.#camera.position.set(x, y, z);

    // Look at the target vector
    this.#camera.lookAt(this.#target);
  }
}
