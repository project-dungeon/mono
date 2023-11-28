import GameObjectsController from "../controllers/game-objects.controller";
import Player from "../entities/player.entity";
import Block from "../entities/block.entity";
import ServerObject from "./server-object";

export const objectIds = {
  Player: 1,
  Block: 2,
};

export default function interpolateObject(data) {
  const serverObject = new ServerObject(data);
  const existingObject = GameObjectsController.findById(
    serverObject.gameObjectId
  );
  if (existingObject) {
    existingObject.serverTick(serverObject);
    return;
  }
  switch (data.id) {
    case objectIds.Player:
      GameObjectsController.addObject(new Player(serverObject));
      break;
    case objectIds.Block:
      GameObjectsController.addObject(new Block(serverObject));
      break;
    default:
      throw new Error(`Unknown object id ${data.id}`);
  }
}
