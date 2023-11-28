import { Attribute, attributeType } from "./attribute.js";

export default class MovementAttribute extends Attribute {
  type = attributeType.Movement;
  value = false;

  constructor(moving, speed) {
    super();
    this.value = moving;
    this.speed = speed;
  }

  json() {
    return {
      type: this.type,
      value: {
        moving: this.value,
        speed: this.speed,
      },
    };
  }
}
