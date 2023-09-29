const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
//const logger = require("morgan");
const { logger } = require("./middleware/logEvents")
const errorHandler = require("./middleware/errorHandler")
const passport = require("passport");
const indexRouter = require("./routes/index");

const app = express();
require("dotenv").config();

const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.tjw2g5c.mongodb.net/?retryWrites=true&w=majority`;
async function main() {
  await mongoose.connect(mongoDB);
}
main().catch((err) => console.log(err));

app.use(logger);
const authorizedCors = ["http://127.0.0.1:5173", "http://127.0.0.1:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (authorizedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false, limit: "2mb" }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./config/passport")(passport);
app.use(passport.initialize());
app.use("/", indexRouter);

app.use(errorHandler)

app.listen(process.env.PORT, () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
