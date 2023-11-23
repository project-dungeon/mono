import crypto from "crypto";

const TICK_RATE_MS = 1000;

export default class GlobalTick {
  static #subscribers = {};

  static addSubscriber(cb) {
    const id = crypto.randomUUID();
    this.#subscribers[id] = cb;
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
