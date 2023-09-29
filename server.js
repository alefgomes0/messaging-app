const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
//const logger = require("morgan");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const passport = require("passport");
const indexRouter = require("./routes/index");

const app = express();
require("dotenv").config();
const verifyJWT = require("./middleware/verifyJWT");

const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.tjw2g5c.mongodb.net/?retryWrites=true&w=majority`;
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

app.use(logger);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./config/passport")(passport);
app.use(passport.initialize());

app.use("/login", require("./routes/auth"));
app.use("/register", require("./routes/register"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);

app.use("/user", require("./routes/user"));
app.use("/conversation", require("./routes/conversation"));
app.use("/messages", require("./routes/message"));
app.use("/newmessage", require("./routes/newmessage"));

app.use("/", indexRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
