import crypto from "crypto";
import { Attribute, attributeType } from "./attribute.js";

export default class ChatAttribute extends Attribute {
  id = crypto.randomUUID();
  type = attributeType.Chat;
  message;

  constructor(message) {
    super();
    this.message = message;
  }

  json() {
    return {
      type: this.type,
      value: {
        id: this.id,
        message: this.message,
      },
    };
  }
}
