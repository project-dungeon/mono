import crypto from "crypto";
import { clientPacketType } from "./packets/client-packet.js";
import WorldLocation from "./world-location.js";
import { worldLocationModel } from "./models/index.js";
import PacketClient from "./packet-client.js";
import ServerPacket, { serverPacketType } from "./packets/server-packet.js";

export default class Player {
  id = crypto.randomUUID();
  #ws;
  #handlers = {
    [clientPacketType.LOGIN]: this.#onLogin.bind(this),
  };
  #packetClient;

  #location;

  #handleLocation() {
    const id = worldLocationModel.subscribe(this.id, "set", (location) => {
      this.#location = location;
      this.#packetClient.send(
        new ServerPacket(serverPacketType.PLAYER_INITIAL_LOCATION, location)
      );
    });
    this.#ws.addEventListener("close", () => {
      worldLocationModel.unsubscribe(this.id, "set", id);
    });
    worldLocationModel.set(this.id, new WorldLocation(0, 0));
  }

  #onLogin() {
    this.#packetClient.send(
      new ServerPacket(serverPacketType.PLAYER_INITIAL_LOGIN_ID, this.id)
    );
    this.#handleLocation();
  }

  constructor(ws) {
    this.#ws = ws;
    this.#packetClient = new PacketClient(ws);
    ws.addEventListener("close", () => {
      worldLocationModel.delete(this.id);
    });
    this.#packetClient.onMessage((packet) => {
      const handler = this.#handlers[packet.topic];
      if (handler) {
        handler(packet.payload);
      }
    });
  }
}
