import Controller from "./controller";
import GameObjectsController from "./game-objects.controller";
import SceneController from "./scene.controller";

export default class CameraFollowPlayerController extends Controller {
  static #lazyPlayer;

  static get #player() {
    if (!this.#lazyPlayer) {
      this.#lazyPlayer = GameObjectsController.findById("player");
    }
    return this.#lazyPlayer;
  }

  static update() {
    const player = this.#player;
  }
}
