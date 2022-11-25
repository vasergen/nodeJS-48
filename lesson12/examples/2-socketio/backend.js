const { Server } = require("socket.io");

const { createServer } = require("http");

const httpServer = new createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("somebody connected!");

  socket.on("chatMessage", (message) => {
    console.log("bradcast event to other clients!", message);
    socket.broadcast.emit("chatMessage", message); //  send event to all other users except the one who send it
  });
});

httpServer.listen(5000, () => {
  console.log("listening on port 5000");
});
