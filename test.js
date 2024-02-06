const ws = require("ws");
const client = new ws("ws://localhost:3000");
client.on("open", () => {
  //the server would now print "Hello"
  client.send("Hello");
});
