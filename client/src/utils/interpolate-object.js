import { Vector3 } from "three";
import GameObjectsController from "../controllers/game-objects.controller";
import ObjectMovementController from "../controllers/object-movement.controller";
import Player from "../entities/player.entity";
import { TICK_RATE_MS } from "../constants";
import Block from "../entities/block.entity";

export const objectIds = {
  Player: 1,
  Block: 2,
};

export default function interpolateObject(data) {
  const object = GameObjectsController.findById(data.gameObjectId);
  if (object) {
    ObjectMovementController.add(
      object,
      new Vector3(
        data.position.x,
        object.gameObject.position.y,
        data.position.y
      ),
      TICK_RATE_MS
    );
    return;
  }
  switch (data.id) {
    case objectIds.Player:
      GameObjectsController.addObject(new Player(data));
      break;
    case objectIds.Block:
      GameObjectsController.addObject(new Block(data));
      break;

    default:
      throw new Error(`Unknown object id ${data.id}`);
  }
}
