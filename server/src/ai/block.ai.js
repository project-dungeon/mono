import { objectModel } from "../models/index.js";
import { Tickable } from "../global-tick.js";
import { objectIds } from "../objects/object.js";

export default class BlockAi extends Tickable {
  #object;
  #speed = 0.5;

  constructor(object) {
    super();
    this.#object = object;
  }

  update() {
    const nearby = objectModel.nearby(this.#object.gameObjectId, 100);
    let nearbyPlayer;
    for (const id of nearby) {
      const object = objectModel.get(id);
      if (object.id === objectIds.Player) {
        nearbyPlayer = object;
        break;
      }
    }
    if (nearbyPlayer) {
      const { x, y } = nearbyPlayer.position;
      const { x: ox, y: oy } = this.#object.position;
      const dx = x - ox;
      const dy = y - oy;
      const angle = Math.atan2(dy, dx);
      this.#object.position.x += Math.cos(angle) * this.#speed;
      this.#object.position.y += Math.sin(angle) * this.#speed;
      objectModel.set(this.#object.gameObjectId, this.#object);
    }
  }
}
