import * as THREE from "three";
import Controller from "./controller";

class ObjectMovement {
  object;
  startPosition;
  destinationPosition;
  startTime;
  endTime;

  constructor(object, destinationPosition, timeMs) {
    this.object = object;
    this.startPosition = object.gameObject.position.clone();
    this.destinationPosition = destinationPosition;
    this.startTime = Date.now();
    this.endTime = this.startTime + timeMs;
  }
}

export default class ObjectMovementController extends Controller {
  static #movements = {};

  static add(object, destinationPosition, time) {
    this.#movements[object.id] = new ObjectMovement(
      object,
      destinationPosition,
      time
    );
  }

  static update() {
    const currentTime = Date.now();

    for (const id in this.#movements) {
      const movement = this.#movements[id];

      const elapsed = Math.min(
        currentTime - movement.startTime,
        movement.endTime - movement.startTime
      );
      const t = elapsed / (movement.endTime - movement.startTime);

      // Ensure t is clamped between 0 and 1
      const clampedT = Math.max(0, Math.min(t, 1));

      // Calculate the new position manually
      const newPosition = movement.object.gameObject.position.clone();
      newPosition.lerpVectors(
        movement.startPosition,
        movement.destinationPosition,
        clampedT
      );
      movement.object.gameObject.position.copy(newPosition);

      if (elapsed >= movement.endTime - movement.startTime) {
        delete this.#movements[id];
      }
    }
  }
}
