const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const admin = new Schema({
  email: {
    type: String,
    unique: true,
  },
  name: String,
  password: {
    type: String,
  },
});
const adminModel = mongoose.model("admin", admin);
module.exports = adminModel;
