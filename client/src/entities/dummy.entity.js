import * as THREE from "three";
import Entity, { EntityType } from "./entity";

export default class Dummy extends Entity {
  #dummy;

  get type() {
    return EntityType.Dummy;
  }

  constructor() {
    super();
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.#dummy = new THREE.Mesh(geometry, material);
    this.#dummy.position.set(0, 0, 0);
    this.#dummy.visible = false;
  }

  get gameObject() {
    return this.#dummy;
  }

  update() {}

  destroy() {
    this.#dummy.geometry.dispose();
    this.#dummy.material.dispose();
  }
}
