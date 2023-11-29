import SceneController from "./src/controllers/scene.controller";
import GameObjectsController from "./src/controllers/game-objects.controller";
import MouseController from "./src/controllers/mouse.controller";
import DebugInfoController from "./src/controllers/debug-info.controller";
import CameraController from "./src/controllers/camera.controller";
import ObjectMovementController from "./src/controllers/object-movement.controller";
import NetworkingController from "./src/controllers/networking.controller";
import UiController from "./src/controllers/ui.controller";

const controllers = [
  SceneController,
  GameObjectsController,
  MouseController,
  DebugInfoController,
  CameraController,
  ObjectMovementController,
  NetworkingController,
  UiController,
];

async function main() {
  function animate() {
    requestAnimationFrame(animate);
    for (const Controller of controllers) {
      Controller.update();
    }
  }
  animate();
}
main();
