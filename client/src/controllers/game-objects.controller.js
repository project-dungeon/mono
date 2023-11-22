import Controller from "./controller";
import SceneController from "./scene.controller";
import Player from "../entities/player.entity";
import Ground from "../entities/ground.entity";

export default class ObjectsController extends Controller {
  static #objects = {};
  static #gameObjects = {};

  static {
    this.addObject(new Player());
    this.addObject(new Ground());
  }

  static addObject(object) {
    console.log("Adding object", object);
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

  static findByGameUuid(uuid) {
    return this.#gameObjects[uuid];
  }

  static findById(id) {
    return this.#objects[id];
  }
}
