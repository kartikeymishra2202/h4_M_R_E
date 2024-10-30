const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const Purchase = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
  date: Date,
});

const PurchaseModel = mongoose.model("purchase", Purchase);

module.exports = PurchaseModel;
