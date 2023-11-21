import Controller from "./controller";

export default class KeyboardController extends Controller {
  static #keysDown = new Set();

  static {
    window.addEventListener("keydown", (event) => {
      this.#keysDown.add(event.key);
    });
    window.addEventListener("keyup", (event) => {
      this.#keysDown.delete(event.key);
    });
  }

  static isPressed(key) {
    return this.#keysDown.has(key);
  }

  static update() {}
}
