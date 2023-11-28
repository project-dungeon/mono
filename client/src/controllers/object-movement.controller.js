import Controller from "./controller";

class ObjectMovement {
  object;
  destinationPosition;

  constructor(object, destinationPosition) {
    this.object = object;
    this.destinationPosition = destinationPosition;
  }
}

export default class ObjectMovementController extends Controller {
  static #movements = {};

  static isMoving(object) {
    const id = typeof object === "string" ? object : object.id;
    return !!this.#movements[id];
  }

  static add(object, destinationPosition) {
    this.#movements[object.id] = new ObjectMovement(
      object,
      destinationPosition
    );
  }

  static update() {
    for (const id in this.#movements) {
      this.#movements[id].object.gameObject.position.lerp(
        this.#movements[id].destinationPosition,
        0.1
      );
    }
    this.#movements = {};
  }
}
