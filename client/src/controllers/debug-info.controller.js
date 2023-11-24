import getPlayer from "../utils/get-player";
import Controller from "./controller";

export default class DebugController extends Controller {
  static #debugInfo;
  static {
    DebugController.#debugInfo = document.getElementById("debug-info");
    DebugController.#debugInfo.style.display = "block";
  }
  static update() {
    const player = getPlayer();
    if (!player) {
      return;
    }
    DebugController.#debugInfo.innerHTML = `
      <p>Player id: ${player.id}</p>
      <p>Player position: ${player.gameObject.position.x.toFixed(
        1
      )}, ${player.gameObject.position.z.toFixed(1)}</p>
    `;
  }
}
