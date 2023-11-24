import { objectModel } from "../models/index.js";
import { Tickable } from "../global-tick.js";
import { objectIds } from "../objects/object.js";
import Move from "../disposable/move.js";

export default class BlockAi extends Tickable {
  #object;
  #speed = 0.1;
  #attackRadius = 2;

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
    if (!nearbyPlayer) {
      Move.stopMove(this.#object);
      return;
    }
    if (
      this.#object.position.distance(nearbyPlayer.position) <=
      this.#attackRadius
    ) {
      Move.stopMove(this.#object);
      return;
    }
    new Move(this.#object, nearbyPlayer.position, this.#speed);
  }
}
