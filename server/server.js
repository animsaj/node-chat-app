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
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
