require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./config/credentials");
const verifyJWT = require("./middleware/verifyJWT");
const verifyRoles = require("./middleware/verifyRoles");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

connectDB();

app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));
app.use("/profile-picture", require("./routes/profilePicture"));

app.use(verifyJWT);
app.use("/conversation", require("./routes/conversation"));
app.use("/messages", require("./routes/message"));
app.use("/new-message", require("./routes/newMessage"));
app.use("/user", require("./routes/user"));

app.use(errorHandler);

/* const server = mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
}); */

const server = app.listen(PORT, () =>
  console.log(`Server started at port ${PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
    withCredentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userId) => {
    socket.join(userId);
    console.log(userId);
    socket.emit("connected", userId);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`A user joined room: ${room}`);
  });

  socket.on("new message", (newMessageSent) => {
    console.log(newMessageSent.participants.receiver);
    socket
      .in(newMessageSent.participants.receiver)
      .emit("message received", newMessageSent);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.disconnect(true);
  });
});
