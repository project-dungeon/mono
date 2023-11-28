import { attributeType } from "../attributes/attribute.js";
import PositionAttribute from "../attributes/position.attribute.js";
import RotationAttribute from "../attributes/rotation.attribute.js";

export const objectIds = {
  Player: 1,
  Block: 2,
};

export default class Object {
  attributes = [];

  get id() {
    throw new Error("id getter must be implemented");
  }

  get gameObjectId() {
    throw new Error("gameObjectId getter must be implemented");
  }

  get name() {
    throw new Error("name getter must be implemented");
  }

  setAttribute(attribute) {
    const index = this.attributes.findIndex(
      (existingAttribute) => existingAttribute.type === attribute.type
    );
    if (index === -1) {
      this.attributes.push(attribute);
    } else {
      this.attributes[index] = attribute;
    }
  }

  getAttribute(type) {
    return this.attributes.find((attribute) => attribute.type === type);
  }

  get position() {
    const position = this.getAttribute(attributeType.Position).value;
    if (!position) {
      throw new Error("position attribute not found");
    }
    return position;
  }

  set position(value) {
    this.setAttribute(new PositionAttribute(value));
  }

  json() {
    return {
      id: this.id,
      gameObjectId: this.gameObjectId,
      name: this.name,
      attributes: this.attributes.map((attribute) => attribute.json()),
    };
  }
}
