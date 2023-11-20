import * as THREE from "three";
import Entity, { EntityType } from "./entity";
import ActionController from "../controllers/action.controller";
import GameObjectsController from "../controllers/game-objects.controller";
import MoveAction from "../actions/move.action";

export default class Ground extends Entity {
  id = "ground";
  #plane;

  get type() {
    return EntityType.Terrain;
  }

  constructor() {
    super();
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    this.#plane = new THREE.Mesh(geometry, material);
    this.#plane.position.set(0, 0, 0);
    this.#plane.rotation.x = -Math.PI / 2;
  }

  get gameObject() {
    return this.#plane;
  }

  click(x, y) {
    ActionController.dispatch(
      new MoveAction(GameObjectsController.findById("player"), x, y)
    );
  }

  update() {}

  destroy() {
    this.#plane.geometry.dispose();
    this.#plane.material.dispose();
  }
}
