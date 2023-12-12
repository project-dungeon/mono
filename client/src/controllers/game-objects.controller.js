import Controller from "./controller";
import SceneController from "./scene.controller";
import Ground from "../entities/ground.entity";
import { EntityType } from "../entities/entity";

export default class ObjectsController extends Controller {
  static #objects = {};
  static #gameObjects = {};

  static {
    this.addObject(new Ground());
  }

  static addObject(object) {
    ObjectsController.#objects[object.id] = object;
    ObjectsController.#gameObjects[object.gameObject.uuid] = object;
    SceneController.scene.add(object.gameObject);
  }

  static removeObject(object) {
    delete ObjectsController.#objects[object.id];
    delete ObjectsController.#gameObjects[object.gameObject.uuid];
    SceneController.scene.remove(object.gameObject);
    object.destroy();
  }

  static update() {
    for (const object of Object.values(this.#objects)) {
      object.update();
    }
  }

  static destroy() {
    for (const object of Object.values(this.#objects)) {
      this.removeObject(object);
    }
  }

  static findById(id) {
    return this.#objects[id];
  }

  static findByGameUuid(uuid) {
    return this.#gameObjects[uuid];
  }

  static gameObjects() {
    return Object.values(this.#gameObjects).filter(
      (o) => o.type === EntityType.GameObject
    );
  }
}
