import getPlayer from "../utils/get-player";
import Controller from "./controller";

export default class DebugController extends Controller {
  static #debugInfo;
  static #lastCalledTime;
  static #fps;

  static {
    DebugController.#debugInfo = document.getElementById("debug-info");
    DebugController.#debugInfo.style.display = "block";
  }
  static update() {
    const player = getPlayer();
    if (!player) {
      return;
    }
    if (!DebugController.#lastCalledTime) {
      DebugController.#lastCalledTime = Date.now();
      DebugController.#fps = 0;
      return;
    }
    const delta = (Date.now() - DebugController.#lastCalledTime) / 1000;
    DebugController.#lastCalledTime = Date.now();
    DebugController.#fps = 1 / delta;
    DebugController.#debugInfo.innerHTML = `
      <p class="debug-info-p">Player id: ${player.id}</p>
      <p class="debug-info-p">Player position: ${player.gameObject.position.x.toFixed(
        1
      )}, ${player.gameObject.position.z.toFixed(1)}</p>
      ${
        player.serverPosition
          ? ` <p class="debug-info-p">Server position: ${player.serverPosition.x.toFixed(
              1
            )}, ${player.serverPosition.y.toFixed(1)}</p>`
          : ""
      }
       <p class="debug-info-p">FPS: ${DebugController.#fps.toFixed(1)}</p>
    `;
  }
}
