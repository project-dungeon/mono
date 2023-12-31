import crypto from "crypto";
import { Tickable } from "../global-tick.js";
import ChatAttribute from "../attributes/chat.attribute.js";
import Model from "../model.js";
import { attributeType } from "../attributes/attribute.js";

const chatDurationMs = 5000;

export default class Chat extends Tickable {
  id = crypto.randomUUID();
  #chatAttributeId;
  #object;
  #startTime;
  #endTime;

  constructor(object, message) {
    super();
    this.#object = object;
    this.#startTime = Date.now();
    this.#endTime = this.#startTime + chatDurationMs;
    const chatAttribute = new ChatAttribute(message);
    this.#object.setAttribute(chatAttribute);
    this.#chatAttributeId = chatAttribute.id;
  }

  update() {
    const sender = Model.get(this.#object.gameObjectId);
    const thisTickChatAttributeId = sender.getAttribute(attributeType.Chat)?.id;
    if (this.#chatAttributeId !== thisTickChatAttributeId) {
      return this.destroy(false);
    }
    if (Date.now() >= this.#endTime) {
      return this.destroy(true);
    }
  }

  destroy(removeAttribute = true) {
    if (removeAttribute) {
      this.#object.removeAttribute(attributeType.Chat);
      Model.set(this.#object.gameObjectId, this.#object);
    }
    super.destroy();
  }
}
