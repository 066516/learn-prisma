const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  console.log("Client connected.");

  socket.on("error", (error) => {
    console.error("WebSocket error:", error.message);
  });
  socket.on("story_created", (data) => {
    console.log("Received story_created event:", data);
    // Handle the data (new story) as needed
  });

  socket.on("close", () => {
    console.log("WebSocket connection closed.");
  });
});
