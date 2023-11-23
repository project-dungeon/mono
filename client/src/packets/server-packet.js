export const serverPacketType = {
  PLAYER_INITIAL_LOGIN_ID: "PLAYER_INITIAL_LOGIN_ID",
  PLAYER_INITIAL_LOCATION: "PLAYER_INITIAL_LOCATION",
};

export default class ServerPacket {
  topic;
  payload;

  constructor(message) {
    const { topic, payload } = JSON.parse(message);
    this.topic = topic;
    this.payload = payload;
  }
}
