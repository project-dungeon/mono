import { Attribute } from "./attribute.js";

export default class RotationAttribute extends Attribute {
  type = 3;
  value;

  constructor(value) {
    super();
    this.value = value;
  }

  json() {
    return {
      type: this.type,
      value: this.value,
    };
  }
}
