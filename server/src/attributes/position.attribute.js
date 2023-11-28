import Vector from "../math/vector.js";
import { Attribute, attributeType } from "./attribute.js";

export default class PositionAttribute extends Attribute {
  type = attributeType.Position;
  value;

  constructor(...xy) {
    super();
    const [first] = xy;
    if (first instanceof Vector) {
      this.value = first;
    } else {
      this.value = new Vector(...xy);
    }
  }

  json() {
    return {
      type: this.type,
      value: this.value.location(),
    };
  }
}
