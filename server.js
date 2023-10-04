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
const PORT = process.env.PORT || 3500;
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

app.use(verifyJWT);
app.use("/conversation", require("./routes/conversation"));
app.use("/messages", require("./routes/message"));
app.use("/new-message", require("./routes/newMessage"));
app.use("/profile-picture", require("./routes/profilePicture"));

app.use(verifyRoles);
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
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData);
    console.log(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

/*   socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    if (!chat.user) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user.id == newMessageReceived.sender.id) return;
      socket.in(user.id).emit("message received", newMessageReceived);
    });
  }); */
});
