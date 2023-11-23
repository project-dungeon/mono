import { WebSocketServer } from "ws";
import { players } from "./src/players.js";
import Player from "./src/player.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  const player = new Player(ws);
  players[player.id] = player;
  ws.on("close", () => {
    delete players[player.id];
  });
});
