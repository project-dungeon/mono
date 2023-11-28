import crypto from "crypto";
import Object, { objectIds } from "./object.js";
import PositionAttribute from "../attributes/position.attribute.js";
import MovementAttribute from "../attributes/movement.attribute.js";
import RotationAttribute from "../attributes/rotation.attribute.js";

export default class PlayerObject extends Object {
  id = objectIds.Player;
  gameObjectId = crypto.randomUUID();
  name;

  constructor(name, position, rotation) {
    super();
    this.name = name;
    this.attributes.push(new PositionAttribute(position));
    this.attributes.push(new MovementAttribute(false, 0));
    this.attributes.push(new RotationAttribute(rotation));
  }
}
