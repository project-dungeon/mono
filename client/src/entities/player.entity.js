import * as THREE from "three";
import Entity, { EntityType } from "./entity";
import SceneController from "../controllers/scene.controller";

export default class Player extends Entity {
  id = "player";
  #cube;

  get movementSpeed() {
    return 1;
  }

  get type() {
    return EntityType.GameObject;
  }

  constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.#cube = new THREE.Mesh(geometry, material);
    this.#cube.position.set(0, 1, 0);
  }

  get gameObject() {
    return this.#cube;
  }

  update() {}

  destroy() {
    this.#cube.geometry.dispose();
    this.#cube.material.dispose();
  }
}
