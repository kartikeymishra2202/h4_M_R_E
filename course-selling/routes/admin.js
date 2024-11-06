const { Router } = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_ADMIN_PASSWORD;
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const adminModel = require("../model/admin");
const adminMiddleWare = require("../middleware/adminmiddleware");
const courseModel = require("../model/course");
const adminRoutes = Router();

adminRoutes.post("/signup", async function (req, res) {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  /////////////////////////////////////////////////// ZOD library validation //////////////////////////////////////
  const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z.string().min(5).max(30),
  });

  const parsedDatawithsuccess = requireBody.safeParse(req.body);
  if (!parsedDatawithsuccess.success) {
    res.json({
      message: "Incorrect format",
      error: parsedDatawithsuccess.error,
    });
    return;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////password hashing/////////////////////////
  const hashPassword = await bcrypt.hash(password, 5);
  /////////////////////////////////////////////

  try {
    const admin = await adminModel.create({
      email: email,
      name: name,
      password: hashPassword,
    });
  } catch (err) {
    return res.json({
      message: err.errmsg,
    });
  }
  return res.json({
    message: "You are signed up",
  });
});

adminRoutes.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const admin = await adminModel.findOne({
    email: email,
  });
  if (!admin) return res.json({ message: "user does not exist." });

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_SECRET
    );
    return res.json({
      token,
    });
  } else {
    return res.json({
      message: "Password is incorrect",
    });
  }
});

adminRoutes.post("/course", adminMiddleWare, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  // creating a web3
  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
  });
});

adminRoutes.put("/course", adminMiddleWare, async function (req, res) {
  const adminId = req.userId;

  const { title, description, imageUrl, price, courseId } = req.body;

  // creating a web3
  const course = await courseModel.findByIdAndUpdate(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );

  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});

adminRoutes.get("/course/all", adminMiddleWare, async function (req, res) {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  res.json({
    message: "ALL courses",
    courses,
  });
});

module.exports = adminRoutes;
