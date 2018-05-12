const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
var bodyParser = require("body-parser");
var cors = require("cors");

const users = require("./routes/api/users");
const poll = require("./routes/poll/poll");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to the Mongo DB
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb://jeff:1234@ds217350.mlab.com:17350/finaldb"
  )
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log("Mongoose Connected");
    },
    err => {
      throw err;
    }
  );
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/routes/poll", poll);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}

// routing Send every request to the React app Define any API routes before this
// runs

const server = app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

const io = require("socket.io").listen(server); // < Interesting!

io.sockets.on("connection", socket => {
  socket.emit(socket.id);
  io.of("/").clients((error, clients) => {
    if (error) throw error;
    socket.emit("users", clients.length); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
  });
  console.log("Connected: %s", socket.id);

  socket.on("chat", function(data) {
    // console.log('message: ' + data)
    io.emit("chat", data);
    console.log(data);
  });
  socket.on("prichat", function(data) {
    // console.log('message: ' + data)
    io.emit("prichat", data);
    console.log(data);
  });
  socket.on("drawing", data => socket.broadcast.emit("drawing", data));
  socket.on("vote", data => io.emit("vote", data));
  socket.on("disconnect", () => console.log("Client disconnected"));
});
