const { Router } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JSON_WEB_Secret";
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const adminModel = require("../model/admin");
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
    message: "You are signed in",
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

adminRoutes.post("/course", function (req, res) {});

adminRoutes.put("/course", function (req, res) {});

adminRoutes.get("/course/b", function (req, res) {});

module.exports = adminRoutes;
