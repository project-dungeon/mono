import crypto from "crypto";
import { Tickable } from "../global-tick.js";
import ChatAttribute from "../attributes/chat.attribute.js";
import Model from "../model.js";
import { attributeType } from "../attributes/attribute.js";

class Chats {
  static chats = {};
}

const chatDurationMs = 5000;

export default class Chat extends Tickable {
  id = crypto.randomUUID();
  #object;
  #startTime;
  #endTime;

  constructor(object, message) {
    super();
    this.#object = object;
    this.#startTime = Date.now();
    this.#endTime = this.#startTime + chatDurationMs;
    this.#object.setAttribute(new ChatAttribute(message));
    Chats.chats[this.#object.gameObjectId] = this;
  }

  update() {
    const existingChat = Chats.chats[this.#object.gameObjectId];
    if (existingChat && existingChat.id !== this.id) {
      existingChat.destroy();
    }
    try {
      if (Date.now() >= this.#endTime) {
        return this.destroy();
      }
    } finally {
      Model.set(this.#object.gameObjectId, this.#object);
      Chats.chats[this.#object.gameObjectId] = this;
    }
  }

  destroy() {
    this.#object.removeAttribute(attributeType.Chat);
    Model.set(this.#object.gameObjectId, this.#object);
    delete Chats.chats[this.#object.gameObjectId];
    super.destroy();
  }
}
