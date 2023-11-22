import Controller from "./controller";
import GameObjectsController from "./game-objects.controller";

export default class DebugController extends Controller {
  static #debugInfo;
  static {
    DebugController.#debugInfo = document.getElementById("debug-info");
    DebugController.#debugInfo.style.display = "block";
  }
  static update() {
    const player = GameObjectsController.findById("player");
    DebugController.#debugInfo.innerHTML = `
      <p>Player: (${player.gameObject.position.x}, ${player.gameObject.position.z})</p>
    `;
  }
}
