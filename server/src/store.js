import crypto from "crypto";

export default class Store {
  #data = {};
  #subscribers = {};

  async #notifySubscribers(key, action) {
    try {
      const subscribers = this.#subscribers[key];
      if (subscribers && subscribers[action]) {
        await Promise.all(Object.values(subscribers[action]).map((cb) => cb()));
      }
    } catch (err) {
      console.error(err);
    }
  }

  get(key) {
    try {
      return this.#data[key];
    } finally {
      this.#notifySubscribers(key, "get");
    }
  }

  set(key, value) {
    try {
      this.#data[key] = value;
    } finally {
      this.#notifySubscribers(key, "set");
    }
  }

  delete(key) {
    try {
      delete this.#data[key];
    } finally {
      this.#notifySubscribers(key, "delete");
    }
  }

  filter(cb) {
    return Object.entries(this.#data).filter(cb);
  }

  subscribe(key, action, cb) {
    const id = crypto.randomUUID();
    this.#subscribers[key] ??= {};
    this.#subscribers[key][action] ??= {};
    const wrappedCb = async () => {
      await cb(this.#data[key]);
      delete this.#subscribers[key][action][id];
    };
    this.#subscribers[key][action][id] = wrappedCb.bind(this);
    return id;
  }

  unsubscribe(key, action, id) {
    delete this.#subscribers[key][action][id];
  }
}
