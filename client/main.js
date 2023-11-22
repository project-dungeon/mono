import SceneController from "./src/controllers/scene.controller";
import GameObjectsController from "./src/controllers/game-objects.controller";
import MouseController from "./src/controllers/mouse.controller";
import CameraFollowPlayerController from "./src/controllers/camera-follow-player.controller";
import DebugInfoController from "./src/controllers/debug-info.controller";
import CameraController from "./src/controllers/camera.controller";
import ObjectMovementController from "./src/controllers/object-movement.controller";

const controllers = [
  SceneController,
  GameObjectsController,
  MouseController,
  CameraFollowPlayerController,
  DebugInfoController,
  CameraController,
  ObjectMovementController,
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
