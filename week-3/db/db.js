const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  name: String,
});

const Todo = new Schema({
  title: String,
  done: {
    type: Boolean,
    default: false,
  },
  userId: ObjectId,
});

const UserModel = mongoose.model("user-1", User);
const TodoModel = mongoose.model("todos-1", Todo);

module.exports = {
  UserModel: UserModel,
  TodoModel: TodoModel,
};
