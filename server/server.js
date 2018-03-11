const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", socket => {
  console.log("New user connected");
  socket.emit("newMessage", {
    from: "Koula",
    text: "guf guf",
    timestamp: new Date(Date.now()).toLocaleString()
  });
  socket.on("createMessage", newMessage => {
    newMessage.timestamp = new Date(Date.now()).toLocaleString();
    socket.emit("newMessage", newMessage);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
