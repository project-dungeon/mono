import BlockAi from "../ai/block.ai.js";
import { objectModel } from "../models/index.js";
import BlockObject from "../objects/block.object.js";
import WorldLocation from "../world-location.js";

export default class Area {
  constructor() {
    const block = new BlockObject("Block", new WorldLocation(0, 5));
    objectModel.set(block.gameObjectId, block);
    new BlockAi(block);
  }
}
