import * as THREE from "three";
import Entity, { EntityType } from "./entity";

export default class Player extends Entity {
  id;
  #cube;

  get type() {
    return EntityType.GameObject;
  }

  constructor(serverObject) {
    super();
    this.id = serverObject.gameObjectId;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.#cube = new THREE.Mesh(geometry, material);
    this.#cube.position.set(
      serverObject.position.x,
      0.5,
      serverObject.position.y
    );
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
