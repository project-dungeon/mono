export const serverPacketType = {
  PLAYER_INITIAL_LOGIN_ID: "PLAYER_INITIAL_LOGIN_ID",
  WORLD: "WORLD",
};

export default class ServerPacket {
  topic;
  payload;

  constructor(topic, payload) {
    this.topic = topic;
    this.payload = payload;
  }

  encode() {
    return JSON.stringify({
      topic: this.topic,
      payload: this.payload,
    });
  }
}
