import { WebSocketServer } from "ws";
import Player from "./src/player.js";

import "./src/global-tick.js";
import "./src/world.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  new Player(ws);
});
