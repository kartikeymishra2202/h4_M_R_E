const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// Connect to MongoDB
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
