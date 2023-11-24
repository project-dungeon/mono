import crypto from "crypto";

const TICK_RATE_MS = 100;

export default class GlobalTick {
  static #subscribers = {};

  static addSubscriber(cb) {
    const id = crypto.randomUUID();
    this.#subscribers[id] = cb;
    return id;
  }

  static removeSubscriber(id) {
    delete this.#subscribers[id];
  }

  static {
    async function tick() {
      while (true) {
        await Promise.all(
          Object.values(GlobalTick.#subscribers).map((cb) => cb())
        );
        await new Promise((resolve) => setTimeout(resolve, TICK_RATE_MS));
      }
    }
    tick();
  }
}

export class Tickable {
  #id;

  constructor() {
    this.#id = GlobalTick.addSubscriber(this.update.bind(this));
  }

  update() {
    throw new Error("update must be implemented");
  }

  destroy() {
    GlobalTick.removeSubscriber(this.#id);
  }
}
