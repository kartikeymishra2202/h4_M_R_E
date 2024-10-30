const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "JSON_WEB_TOKEN";
const { z } = require("zod");

//User Models--------------------------------------------------------------------------------------------------------

const { UserModel, TodoModel } = require("./db/db.js");

// const { connectDB } = require("./db/connect.js");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

//data base connection-------------------------
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

connectDB();
//////////////////////////////////////////////
app.post("/signup", async (req, res) => {
  /////////////////////////////////////////////////// ZOD library validation //////////////////////////////////////
  const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    name: z.string().min(3).max(100),
    password: z.string().min(8).max(30),
  });

  const parsedDatawithsuccess = requireBody.safeParse(req.body);
  if (!parsedDatawithsuccess.success) {
    res.json({
      message: "Incorrect format",
      error: parsedDatawithsuccess.error,
    });
    return;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  const hashPassword = await bcrypt.hash(password, 5);
  await UserModel.create({
    email: email,
    name: name,
    password: hashPassword,
  });
  return res.json({
    message: "You are signed in",
  });
});

app.post("/signin", async (req, res) => {
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

function auth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "Auth failed: Token is missing" });
  }
  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded) {
    req.userId = decoded.id;
    next();
  } else {
    return res.json({
      message: "auth failed",
    });
  }
}

app.post("/todo", auth, async (req, res) => {
  const userId = req.userId;
  const { title, done } = req.body;
  const todo = await TodoModel.create({
    title: title,
    done: done,
    userId: userId,
  });
  return res.json({
    message: "todo is created",
    todo,
  });
});

app.get("todos", auth, async (req, res) => {
  const userId = req.userId;
  const todo = await TodoModel.findOne({
    userId,
  });
  if (todo) {
    res.json({
      todo,
    });
  }
});

app.listen(3000);
