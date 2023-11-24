import crypto from "crypto";
import Object, { objectIds } from "./object.js";

export default class BlockObject extends Object {
  id = objectIds.Block;
  gameObjectId = crypto.randomUUID();
  name;
  position;

  constructor(name, position) {
    super();
    this.name = name;
    this.position = position;
  }
}
