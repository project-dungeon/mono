import GameObjectsController from "../controllers/game-objects.controller";
import Player from "../entities/player.entity";

export const objectIds = {
  Player: 1,
  Block: 2,
};

export default function instantiateObject(data) {
  const object = GameObjectsController.findByGameUuid(data.gameObjectId);
  if (object) {
    object.gameObject.position.set(data.position.x, data.position.y);
    return;
  }
  switch (data.id) {
    case objectIds.Player: {
      const player = new Player(data);
      GameObjectsController.addObject(player);
      break;
    }
    case objectIds.Block:
    // return new Block(object);
    default:
      throw new Error(`Unknown object id ${data.id}`);
  }
}
