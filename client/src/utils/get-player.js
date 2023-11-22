import GameObjectsController from "../controllers/game-objects.controller";

export default function getPlayer() {
  return GameObjectsController.findById("player");
}
