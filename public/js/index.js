var socket = io();
socket.on("connect", function() {
  console.log("Connected to the server");
  socket.emit("createMessage", {
    from: "Danka",
    text: "Mamaaaa"
  });
});
socket.on("disconnect", function() {
  console.log("Disconnected from the server");
});
socket.on("newMessage", function(msg) {
  console.log(msg);
});
