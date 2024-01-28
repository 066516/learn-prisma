// app.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIo(server); // Setup Socket.IO
require('dotenv').config();
app.use(express.json());

// Import routes as a function and pass `io`
const storyRoutes = require("./routes/story")(io);
const userRoutes = require("./routes/user"); // Assuming `userRoutes` doesn't need `io`
const updateStory = require("./corn/storyCorn");
app.use("/api", storyRoutes);
app.use("/api", userRoutes);
// app.use("/api", userRoutes); // Use this if `userRoutes` is properly set up to handle `io` or doesn't need it

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
