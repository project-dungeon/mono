import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import Entity, { EntityType } from "./entity";
import SceneController from "../controllers/scene.controller";

export default class Player extends Entity {
  id;
  #threeObject;
  #mixer;
  #clock;
  #actions = {};
  #currentAnimation = "idle";
  #targetPosition = new THREE.Vector3();
  #movement;
  #chat;
  #name;
  #chatObject;
  #chatLoading = false;

  serverPosition;

  get type() {
    return EntityType.GameObject;
  }

  get gameObject() {
    return this.#threeObject;
  }

  constructor(serverObject) {
    super();
    this.#name = serverObject.name;
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
    this.#handlechat(serverObject.chat);
  }

  #handlechat(chat) {
    if (!chat) {
      this.#chat = undefined;
      return;
    }
    const oldChat = this.#chat;
    this.#chat = chat;
    if (oldChat?.id !== this.#chat.id) {
      dispatchEvent(
        new CustomEvent("__PDG__chat-received", {
          detail: {
            message: this.#chat.message,
            author: this.#name,
          },
        })
      );
    }
  }

  async #updateChat() {
    if (this.#chatLoading) {
      return;
    }
    if (!this.#chat) {
      this.#chatObject?.parent.remove(this.#chatObject);
      this.#chatObject = undefined;
      return;
    }
    if (!this.#chatObject) {
      const fontLoader = new FontLoader();
      this.#chatLoading = true;
      await new Promise((resolve) =>
        fontLoader.load(
          "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
          (font) => {
            const geometry = new TextGeometry(this.#chat.message, {
              font,
              size: 0.18,
              height: 0.05,
            });
            const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.name = "chat";
            mesh.position.set(0, 2, 0);
            this.#threeObject.add(mesh);
            mesh.lookAt(SceneController.camera.position);
            this.#chatObject = mesh;
            resolve();
          }
        )
      );
      this.#chatLoading = false;
    }
    this.#chatObject.lookAt(SceneController.camera.position);
  }

  #updateMovement() {
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
    this.#updateMovement();
    this.#updateAnimation();
    this.#updateChat();
  }

  destroy() {
    this.#threeObject.parent.remove(this.#threeObject);
    this.#threeObject = null;
  }
}
