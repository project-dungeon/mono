import PacketClient from "../../../server/src/packet-client";
import config from "../config";
import ClientPacket, { clientPacketType } from "../packets/client-packet";
import Controller from "./controller";

export default class NetworkingController extends Controller {
  static #handlers = {};

  static {
    const ws = new WebSocket(config.WORLD_URL);
    ws.addEventListener("open", () => {
      const packetClient = new PacketClient(ws);
      packetClient.send(
        new ClientPacket({ topic: clientPacketType.LOGIN, payload: {} })
      );
    });
  }

  static update() {}
}
