import * as THREE from "three";
import Controller from "./controller";
import SceneController from "./scene.controller";
import GameObjectsController from "./game-objects.controller";
import { EntityType } from "../entities/entity";

export default class MouseController extends Controller {
  static #raycaster = new THREE.Raycaster();
  static #mouseChanged = false;
  static #mouse = new THREE.Vector2();
  static #intersection;

  static #updateTarget() {
    if (!this.#mouseChanged) {
      return;
    }
    this.#raycaster.setFromCamera(this.#mouse, SceneController.camera);
    const intersects = this.#raycaster.intersectObjects(
      SceneController.scene.children
    );
    if (!intersects.length) {
      this.#intersection = null;
      return;
    }
    const [intersection] = intersects;
    this.#intersection = {
      point: intersection.point,
      object: GameObjectsController.findByGameUuid(intersection.object.uuid),
    };
  }

  static {
    window.addEventListener("mousemove", (event) => {
      this.#mouseChanged = true;
      this.#mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.#mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    window.addEventListener("click", () => {
      if (this.#intersection) {
        console.log("CLICKED", this.#intersection.point);
        this.#intersection.object?.click(
          this.#intersection.point.x,
          this.#intersection.point.y,
          this.#intersection.point.z
        );
      }
    });
  }

  static update() {
    this.#updateTarget();
    if (!this.#intersection) {
      document.body.style.cursor = "not-allowed";
    } else if (this.#intersection.object.type === EntityType.GameObject) {
      document.body.style.cursor = "pointer";
    } else if (this.#intersection.object.type === EntityType.Terrain) {
      document.body.style.cursor = "crosshair";
    }
  }
}
