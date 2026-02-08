const express = require("express");
const WebSocket = require("ws");

const app = express();
app.use(express.static("public"));

const server = app.listen(3072, () =>
  console.log("http://localhost:3072")
);

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  console.log("client connected");
  ws.on("message", msg => {
    console.log("signal:", msg.toString());
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});
