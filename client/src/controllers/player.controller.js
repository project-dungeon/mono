import GameObjectsController from "./game-objects.controller";
import Controller from "./controller";

export default class PlayerController extends Controller {
  static #playerId;

  static set playerId(playerId) {
    this.#playerId = playerId;
  }

  static get playerId() {
    return this.#playerId;
  }

  static get player() {
    return GameObjectsController.findById(this.#playerId);
  }

  static update() {}
}
