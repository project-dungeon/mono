import crypto from "crypto";
import Object, { objectIds } from "./object.js";
import PositionAttribute from "../attributes/position.attribute.js";

export default class BlockObject extends Object {
  id = objectIds.Block;
  gameObjectId = crypto.randomUUID();
  name;

  constructor(name, position) {
    super();
    this.name = name;
    this.attributes.push(new PositionAttribute(position));
  }
}
