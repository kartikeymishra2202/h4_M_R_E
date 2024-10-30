const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
// Connect to MongoDB
const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      `mongodb+srv://mharmilap:P8w1rZApJ9236Kgk@cluster0.ebc3q.mongodb.net/`
    );
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
