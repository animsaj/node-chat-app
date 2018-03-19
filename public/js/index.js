var socket = io();
socket.on("connect", function() {
  console.log("Connected to the server");
  socket.on("disconnect", function() {
    console.log("Disconnected from the server");
  });
  socket.on("newMessage", function(msg) {
    jQuery("<li/>", { text: `${msg.from}: ${msg.text}` }).appendTo(
      "#message-list"
    );
  });
  socket.on("newLocationMessage", function(msg) {
    var li = jQuery("<li></li>");
    var a = jQuery("<a target='_blank'>My location</a>");
    a.attr("href", msg.url);
    li.text(`${msg.from}: `);
    li.append(a);
    jQuery("#message-list").append(li);
  });
  jQuery("#message-form").submit(function(event) {
    event.preventDefault();
    var messageText = jQuery("#message").val();
    socket.emit("createMessage", {
      from: "User",
      text: messageText
    });
    jQuery("#message").val("");
  });
  jQuery("#locationBtn").on("click", function() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          socket.emit("locationMessage", {
            from: "User",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function() {
          return alert("Unable to fetch your position");
        }
      );
    } else {
      return alert("Geolocation not supported by your browser");
    }
  });
});
