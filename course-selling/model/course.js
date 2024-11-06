const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const Course = new Schema({
  title: {
    type: String,
  },
  description: String,
  price: {
    type: Number,
  },
  imageUrl: String,
  creatorId: ObjectId,
});
const courseModel = mongoose.model("course", Course);
module.exports = courseModel;
