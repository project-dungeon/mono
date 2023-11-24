import * as THREE from "three";
import Entity, { EntityType } from "./entity";
import getPlayer from "../utils/get-player";
import ObjectMovementController from "../controllers/object-movement.controller";
import NetworkingController from "../controllers/networking.controller";

export default class Ground extends Entity {
  id = "ground";
  #plane;

  get type() {
    return EntityType.Terrain;
  }

  constructor() {
    super();
    const geometry = new THREE.PlaneGeometry(150, 150);
    const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    this.#plane = new THREE.Mesh(geometry, material);
    this.#plane.position.set(0, 0, 0);
    this.#plane.rotation.x = -Math.PI / 2;
  }

  get gameObject() {
    return this.#plane;
  }

  click(x, _, z) {
    NetworkingController.move(x, z);
  }

  update() {}

  destroy() {
    this.#plane.geometry.dispose();
    this.#plane.material.dispose();
  }
}
