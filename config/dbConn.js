const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = connectDb