export const clientPacketType = {
  LOGIN: "LOGIN",
  MOVE: "MOVE",
};

export default class ClientPacket {
  topic;
  payload;

  constructor(data) {
    this.topic = data.topic;
    this.payload = data.payload;
  }

  encode() {
    return JSON.stringify({
      topic: this.topic,
      payload: this.payload,
    });
  }
}
