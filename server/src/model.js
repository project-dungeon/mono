import crypto from "crypto";

export default class Model {
  static #data = {};
  static #subscribers = {};

  static async #notifySubscribers(key, action) {
    try {
      const subscribers = Model.#subscribers[key];
      if (subscribers && subscribers[action]) {
        await Promise.all(Object.values(subscribers[action]).map((cb) => cb()));
      }
    } catch (err) {
      console.error(err);
    }
  }

  static get(key) {
    try {
      return Model.#data[key];
    } finally {
      Model.#notifySubscribers(key, "get");
    }
  }

  static set(key, value) {
    try {
      Model.#data[key] = value;
    } finally {
      Model.#notifySubscribers(key, "set");
    }
  }

  static delete(key) {
    try {
      delete Model.#data[key];
    } finally {
      Model.#notifySubscribers(key, "delete");
    }
  }

  static filter(cb) {
    const filtered = [];
    for (const [key, value] of Object.entries(Model.#data)) {
      if (cb([key, value])) {
        filtered.push(value);
      }
    }
    return filtered;
  }

  static nearby(id, r) {
    const object = Model.get(id);
    if (!object) {
      return [];
    }
    return Model.filter(([, comparator]) => {
      return object.position.distance(comparator.position) <= r;
    });
  }

  static subscribe(key, action, cb) {
    const id = crypto.randomUUID();
    Model.#subscribers[key] ??= {};
    Model.#subscribers[key][action] ??= {};
    const wrappedCb = async () => {
      await cb(Model.#data[key]);
    };
    Model.#subscribers[key][action][id] = wrappedCb.bind(Model);
    return id;
  }

  static unsubscribe(key, action, id) {
    delete Model.#subscribers[key][action][id];
  }
}
