import BlockAi from "../ai/block.ai.js";
import Vector from "../math/vector.js";
import Model from "../model.js";
import BlockObject from "../objects/block.object.js";

export default class Area {
  constructor() {
    const block = new BlockObject("Block", new Vector(0, 5));
    Model.set(block.gameObjectId, block);
    new BlockAi(block);
  }
}
