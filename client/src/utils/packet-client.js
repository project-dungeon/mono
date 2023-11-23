import ServerPacket from "../packets/server-packet";

export default class PacketClient {
  #ws;

  constructor(ws) {
    this.#ws = ws;
  }

  onMessage(handler) {
    this.#ws.onmessage = (message) => {
      const packet = new ServerPacket(message);
      handler(packet);
    };
  }

  send(packet) {
    this.#ws.send(packet.encode());
  }
}
