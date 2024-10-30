const jwt = require("jsonwebtoken");
const JWT_SECRET = "JSON_WEB_TOKEN";

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
