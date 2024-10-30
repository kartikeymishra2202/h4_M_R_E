const { Router } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JSON_WEB_TOKEN";
const bcrypt = require("bcryptjs");
const { z } = require("zod");
const UserModel = require("../model/user");

const userRoutes = Router();

userRoutes.post("/signup", async function (req, res) {
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
    await UserModel.create({
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

userRoutes.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
  });
  if (!user) return res.json({ message: "user does not exist." });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: user._id,
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

module.exports = userRoutes;
