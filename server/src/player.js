import { clientPacketType } from "./packets/client-packet.js";
import WorldLocation from "./world-location.js";
import PacketClient from "./packet-client.js";
import GlobalTick from "./global-tick.js";
import { objectModel } from "./models/index.js";
import PlayerObject from "./objects/player.object.js";
import ServerPacket, { serverPacketType } from "./packets/server-packet.js";

export default class Player {
  #ws;
  #handlers = {
    [clientPacketType.LOGIN]: this.#onLogin.bind(this),
  };
  #packetClient;
  #thisTickPackets = [];
  #thisObject;
  #nearbyObjectsIds = [];

  get id() {
    return this.#thisObject.gameObjectId;
  }

  #queuePacket(packet) {
    this.#thisTickPackets.push(packet);
  }

  #handleClose() {
    this.#ws.addEventListener("close", () => {
      objectModel.delete(this.id);
    });
  }

  #handleLocation() {
    const id = objectModel.subscribe(this.id, "set", (playerObject) => {
      this.#thisObject = playerObject;
    });
    this.#ws.addEventListener("close", () => {
      objectModel.unsubscribe(this.id, "set", id);
    });
  }

  #handleNearbyObjects() {
    const id = GlobalTick.addSubscriber(() => {
      this.#nearbyObjectsIds = objectModel.nearby(this.id, 100);
      this.#queuePacket(
        new ServerPacket(serverPacketType.WORLD, {
          objects: this.#nearbyObjectsIds.map((noid) =>
            objectModel.get(noid).json()
          ),
        })
      );
    });
    this.#ws.addEventListener("close", () => {
      GlobalTick.removeSubscriber(id);
    });
  }

  #updateClient() {
    const id = GlobalTick.addSubscriber(async () => {
      await Promise.all(
        this.#thisTickPackets.map((packet) => this.#packetClient.send(packet))
      );
      this.#thisTickPackets = [];
    });
    this.#ws.addEventListener("close", () => {
      GlobalTick.removeSubscriber(id);
    });
  }

  async #onLogin() {
    this.#thisObject = new PlayerObject(
      "Player",
      new WorldLocation(Math.random() * 10, Math.random() * 10)
    );
    objectModel.set(this.id, this.#thisObject);
    this.#queuePacket(
      new ServerPacket(serverPacketType.PLAYER_INITIAL_LOGIN_ID, {
        id: this.id,
      })
    );
    this.#handleLocation();
    this.#handleNearbyObjects();
    this.#updateClient();
    this.#handleClose();
  }

  constructor(ws) {
    this.#ws = ws;
    this.#packetClient = new PacketClient(ws);
    this.#packetClient.onMessage((packet) => {
      const handler = this.#handlers[packet.topic];
      if (handler) {
        handler(packet.payload);
      }
    });
  }
}
