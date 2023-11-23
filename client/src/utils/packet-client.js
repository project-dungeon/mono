import ServerPacket from "../packets/server-packet.js";

export default class PacketClient {
  #ws;

  constructor(ws) {
    this.#ws = ws;
  }

  onMessage(handler) {
    this.#ws.on("message", (message) => {
      const packet = new ServerPacket(message);
      handler(packet);
    });
  }

  send(packet) {
    this.#ws.send(packet.encode());
  }
}
