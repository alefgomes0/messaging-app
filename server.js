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

const io = require("socket.io")(5000);

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

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", ({ recipients, message }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipient.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: id,
        message,
      });
    });
  });
});

app.use(verifyJWT);
app.use("/conversation", require("./routes/conversation"));
app.use("/chat", require("./routes/chat"))
app.use("/search-user", require("./routes/searchUser"));
app.use("/messages", require("./routes/message"));
app.use("/new-message", require("./routes/newMessage"));
app.use("/profile-picture", require("./routes/profilePicture"));

app.use(verifyRoles);
app.use("/user", require("./routes/user"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
});
