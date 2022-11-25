const { WebSocketServer } = require("ws");

const ws = new WebSocketServer({
  port: 5000,
});

const clients = [];

ws.on("connection", (newClient) => {
  console.log("new client connected");
  clients.push(newClient);

  newClient.send("hello from backend!" + new Date().toISOString()); // send message to frontend!

  // setInterval(() => {
  //   newClient.send("message from backend" + new Date().toLocaleTimeString());
  // }, 1000);

  newClient.on("message", (message) => {
    console.log("got data from frontend:", message.toString());
  });

  for (const client of clients) {
    if (client !== newClient) {
      client.send("new user connected" + new Date().toISOString());
    }
  }
});

console.log("serveris running on port 5000");
