const authorizedCors = ["http://127.0.0.1:5173", "http://127.0.0.1:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    if (authorizedCors.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
