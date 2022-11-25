const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("somebody connected!");

  socket.on("chatMessage", (message) => {
    console.log("bradcast event to other clients!", message);
    socket.broadcast.emit("chatMessage", message); //  send event to all other users except the one who send it
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const { PORT = 5000 } = process.env;

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`listening on port ${PORT}`);
});
