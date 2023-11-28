import crypto from "crypto";
import { Tickable } from "../global-tick.js";
import Model from "../model.js";
import MovementAttribute from "../attributes/movement.attribute.js";

class Movements {
  static movements = {};
}

export default class Move extends Tickable {
  id = crypto.randomUUID();
  #object;
  #location;
  #speed = 0.5;

  constructor(object, location, speed = 0.5) {
    super();
    this.#object = object;
    this.#location = location;
    this.#speed = speed;
    object.setAttribute(new MovementAttribute(true, speed));
    Model.set(object.gameObjectId, object);
  }

  update() {
    const existingMove = Movements.movements[this.#object.gameObjectId];
    if (existingMove && existingMove.id !== this.id) {
      existingMove.destroy();
    }
    try {
      if (this.#object.position.equals(this.#location)) {
        this.#object.setAttribute(new MovementAttribute(false, 0));
        return this.destroy();
      }
      if (this.#object.position.distance(this.#location) <= this.#speed) {
        this.#object.position = this.#location;
      } else {
        const { x, y } = this.#location;
        const { x: ox, y: oy } = this.#object.position;
        const dx = x - ox;
        const dy = y - oy;
        const angle = Math.atan2(dy, dx);
        this.#object.position.x += Math.cos(angle) * this.#speed;
        this.#object.position.y += Math.sin(angle) * this.#speed;
      }
    } finally {
      Model.set(this.#object.gameObjectId, this.#object);
      Movements.movements[this.#object.gameObjectId] = this;
    }
  }

  destroy() {
    delete Movements.movements[this.#object.gameObjectId];
    super.destroy();
  }
}
