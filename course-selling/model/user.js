const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    unique: true,
  },
  name: String,
  password: {
    type: String,
  },
});
const UserModel = mongoose.model("user-sel", User);
module.exports = UserModel;
