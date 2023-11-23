import crypto from "crypto";

export const objectIds = {
  Player: 1,
  Block: 2,
};

export default class Object {
  get id() {
    throw new Error("id getter must be implemented");
  }

  get gameObjectId() {
    throw new Error("gameObjectId getter must be implemented");
  }

  get name() {
    throw new Error("name getter must be implemented");
  }

  get position() {
    throw new Error("position getter must be implemented");
  }

  json() {
    return {
      id: this.id,
      gameObjectId: this.gameObjectId,
      name: this.name,
      position: this.position,
    };
  }
}
