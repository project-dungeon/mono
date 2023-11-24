import ClientPacket from "./packets/client-packet.js";

export default class PacketClient {
  #ws;

  constructor(ws) {
    this.#ws = ws;
  }

  onMessage(handler) {
    this.#ws.on("message", (message) => {
      console.log("Message received:", message.toString());
      const packet = new ClientPacket(message);
      handler(packet);
    });
  }

  async send(packet) {
    return this.#ws.send(packet.encode());
  }
}
