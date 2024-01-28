const io = require("socket.io-client");

// Replace with the actual URL of your Socket.io server
const serverUrl = "http://localhost:3000";
const socket = io(serverUrl);

// Listen for the "connect" event to ensure the connection is established
socket.on("connect", () => {
  console.log("Connected to the server");

  // Listen for the "story" event
  socket.on("story_created", (story) => {
    console.log("Received story:", story);

    // Add your test assertions here to verify the received story object
    if (story.id === 1 && story.content === "Test Story") {
      console.log("Test passed: Received the expected story object");
    } else {
      console.error("Test failed: Received unexpected story object");
    }

    // Disconnect from the server after testing
    socket.disconnect();
  });
});

// Listen for the "disconnect" event
socket.on("disconnect", () => {
  console.log("Disconnected from the server");
});

// Handle any errors that occur
socket.on("error", (error) => {
  console.error("Socket error:", error);
});
