import * as THREE from "three";
import Entity, { EntityType } from "./entity";

export default class Block extends Entity {
  id;
  #cube;

  get type() {
    return EntityType.GameObject;
  }

  get gameObject() {
    return this.#cube;
  }

  constructor(serverObject) {
    super();
    this.id = serverObject.gameObjectId;
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.#cube = new THREE.Mesh(geometry, material);
    this.#cube.position.set(
      serverObject.position.x,
      0.5,
      serverObject.position.y
    );
  }

  serverTick(serverObject) {
    // update position
  }

  update() {}

  destroy() {
    this.#cube.geometry.dispose();
    this.#cube.material.dispose();
  }
}
