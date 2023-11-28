import { Tickable } from "../global-tick.js";
import { objectIds } from "../objects/object.js";
import Move from "../disposable/move.js";
import Model from "../model.js";

export default class BlockAi extends Tickable {
  #object;
  #speed = 0.1;
  #attackRadius = 2;

  constructor(object) {
    super();
    this.#object = object;
  }

  update() {
    // TODO
  }
}
