import config from "../config";
import ClientPacket, { clientPacketType } from "../packets/client-packet";
import { serverPacketType } from "../packets/server-packet";
import PacketClient from "../utils/packet-client";
import Controller from "./controller";
import PlayerController from "./player.controller";
import GameObjectsController from "./game-objects.controller";
import interpolateObject from "../utils/interpolate-object";

export default class NetworkingController extends Controller {
  static #playerId;
  static #handlers = {
    [serverPacketType.PLAYER_INITIAL_LOGIN_ID]:
      NetworkingController.#handlePlayerInitialLoginId,
    [serverPacketType.WORLD]: NetworkingController.#handleWorld,
  };
  static #packetClient;

  static #handlePlayerInitialLoginId(packet) {
    NetworkingController.#playerId = packet.payload.id;
  }

  static #handleWorld(packet) {
    const used = new Set();
    for (const object of packet.payload.objects) {
      if (object.gameObjectId === NetworkingController.#playerId) {
        PlayerController.playerId = object.gameObjectId;
      }
      interpolateObject(object);
      used.add(object.gameObjectId);
    }
    for (const object of GameObjectsController.gameObjects()) {
      if (!used.has(object.id)) {
        GameObjectsController.removeObject(object);
      }
    }
  }

  static {
    const ws = new WebSocket(config.WORLD_URL);
    ws.addEventListener("open", () => {
      this.#packetClient = new PacketClient(ws);
      this.#packetClient.send(
        new ClientPacket({ topic: clientPacketType.LOGIN, payload: {} })
      );
      ws.addEventListener("close", () => {
        alert("Connection to server lost");
      });
      this.#packetClient.onMessage((message) => {
        const handler = NetworkingController.#handlers[message.topic];
        if (handler) {
          handler(message);
        }
      });
    });
  }

  static move(x, y) {
    this.#packetClient.send(
      new ClientPacket({
        topic: clientPacketType.MOVE,
        payload: { x, y },
      })
    );
  }

  static update() {}
}
