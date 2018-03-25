const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const http = require("http");
const moment = require('moment');

const { generateMessage, generateLocationMessage } = require("./utils/message");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, "../public")));

io.on("connection", socket => {
  console.log("New user connected");
  socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat!"));
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user has joined the chat")
  );
  socket.on("createMessage", message => {
    newMessage = {
      createdAt: moment().valueOf(),
      from: message.from,
      text: message.text
    };
    io.emit("newMessage", newMessage);
  });
  socket.on("locationMessage", message => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage(message.from, message.latitude, message.longitude)
    );
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
