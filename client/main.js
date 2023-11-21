import SceneController from "./src/controllers/scene.controller";
import GameObjectsController from "./src/controllers/game-objects.controller";
import MouseController from "./src/controllers/mouse.controller";
import ActionController from "./src/controllers/action.controller";
import CameraFollowPlayerController from "./src/controllers/camera-follow-player.controller";
import DebugInfoController from "./src/controllers/debug-info.controller";
import CameraController from "./src/controllers/camera.controller";

const controllers = [
  SceneController,
  GameObjectsController,
  MouseController,
  ActionController,
  CameraFollowPlayerController,
  DebugInfoController,
  CameraController,
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
