var socket = io();
socket.on("connect", function() {
  console.log("Connected to the server");
  socket.on("disconnect", function() {
    console.log("Disconnected from the server");
  });
  socket.on("newMessage", function(msg) {
    var formattedTime = moment(msg.createdAt).format("h:mm a");
    var template = $("#message-template").html();
    var html = Mustache.render(template, {
      from: msg.from,
      text: msg.text,
      createdAt: formattedTime
    });
    jQuery("#message-list").append(html);
  });
  socket.on("newLocationMessage", function(msg) {
    var formattedTime = moment(msg.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
      from: msg.from,
      url: msg.url,
      createdAt: formattedTime
    });
    jQuery("#message-list").append(html);
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
  var locationBtn = jQuery("#locationBtn");
  locationBtn.on("click", function() {
    if ("geolocation" in navigator) {
      locationBtn.attr("disabled", "disabled").text("Sending location...");
      navigator.geolocation.getCurrentPosition(
        function(position) {
          locationBtn.removeAttr("disabled").text("Send location");
          socket.emit("locationMessage", {
            from: "User",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        function() {
          locationBtn.removeAttr("disabled").text("Send location");
          return alert("Unable to fetch your position");
        }
      );
    } else {
      return alert("Geolocation not supported by your browser");
    }
  });
});
