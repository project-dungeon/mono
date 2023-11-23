import crypto from "crypto";
import Object, { objectIds } from "./object.js";

export default class PlayerObject extends Object {
  id = objectIds.Player;
  gameObjectId = crypto.randomUUID();
  name;
  position;

  constructor(name, position) {
    super();
    this.name = name;
    this.position = position;
  }
}
