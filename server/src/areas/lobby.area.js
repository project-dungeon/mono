import { objectModel } from "../models/index.js";
import PlayerObject from "../objects/player.object.js";
import WorldLocation from "../world-location.js";

export default class Area {
  constructor() {
    const anotherPlayer = new PlayerObject(
      "Another Player",
      new WorldLocation(0, 2)
    );
    objectModel.set(anotherPlayer.gameObjectId, anotherPlayer);
  }
}
