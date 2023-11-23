export const clientPacketType = {
  LOGIN: "LOGIN",
  MOVE: "MOVE",
};

export default class ClientPacket {
  topic;
  payload;

  constructor(data) {
    const { topic, payload } = JSON.parse(data);
    this.topic = topic;
    this.payload = payload;
  }
}
