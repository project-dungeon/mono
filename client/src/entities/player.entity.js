import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TICK_RATE_MS } from "../constants";
import Entity, { EntityType } from "./entity";

export default class Player extends Entity {
  id;
  #threeObject;
  #mixer;
  #clock;
  #actions = {};
  #currentAnimation = "idle";
  #targetPosition = new THREE.Vector3();
  #movement;

  serverPosition;

  get type() {
    return EntityType.GameObject;
  }

  get gameObject() {
    return this.#threeObject;
  }

  constructor(serverObject) {
    super();
    this.id = serverObject.gameObjectId;
    this.#movement = serverObject.movement;
    const container = new THREE.Object3D();
    container.position.set(serverObject.position.x, 0, serverObject.position.y);
    container.rotation.y = serverObject.rotation;
    const loader = new GLTFLoader();
    let model;

    loader.load("https://threejs.org/examples/models/gltf/Xbot.glb", (gltf) => {
      model = gltf.scene;
      container.add(model);
      const skeleton = new THREE.SkeletonHelper(model);
      skeleton.visible = false;
      container.add(skeleton);

      const animations = gltf.animations;
      this.#mixer = new THREE.AnimationMixer(model);

      for (const animation of animations) {
        const action = this.#mixer.clipAction(animation);
        this.#actions[animation.name] = action;
      }
      this.#actions["idle"].play();
    });

    this.#threeObject = container;
    this.#clock = new THREE.Clock();
  }

  serverTick(serverObject) {
    this.serverPosition = serverObject.position;
    this.#movement = serverObject.movement;
    this.#targetPosition.set(
      serverObject.position.x,
      0,
      serverObject.position.y
    );
    this.#threeObject.rotation.y = serverObject.rotation;
  }

  #smoothLerp() {
    const alpha = 0.2; // Adjust alpha for the smoothness factor
    this.#threeObject.position.lerp(this.#targetPosition, alpha);
  }

  #updateAnimation() {
    if (this.#movement.moving) {
      this.#currentAnimation = "walk";
    } else {
      this.#currentAnimation = "idle";
    }
    if (!this.#mixer) {
      return;
    }
    this.#mixer.update(this.#clock.getDelta());
    let runningAction;
    for (const [name, action] of Object.entries(this.#actions)) {
      if (action.isRunning()) {
        runningAction = name;
      }
    }
    if (runningAction === this.#currentAnimation) {
      return;
    }
    this.#actions[runningAction].stop();
    this.#actions[this.#currentAnimation].play();
  }

  update() {
    this.#smoothLerp();
    this.#updateAnimation();
  }

  destroy() {
    this.#threeObject.parent.remove(this.#threeObject);
    this.#threeObject = null;
  }
}
