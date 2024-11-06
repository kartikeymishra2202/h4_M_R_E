const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_USER_PASSWORD;

function userMiddleWare(req, res, next) {
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
module.exports = userMiddleWare;
