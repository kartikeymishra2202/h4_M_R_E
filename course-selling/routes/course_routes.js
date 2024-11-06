const { Router } = require("express");
const userMiddleWare = require("../middleware/userMiddleware");
const PurchaseModel = require("../model/purchase");
const courseModel = require("../model/course");
const courseRoute = Router();

courseRoute.post("/purchase", userMiddleWare, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;
  await PurchaseModel.create({
    userId,
    courseId,
  });
  res.json({
    message: "YOu have successfully brought the course",
  });
});
courseRoute.get("/review", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    courses,
  });
});

module.exports = courseRoute;
