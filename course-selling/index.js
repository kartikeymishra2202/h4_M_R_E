const express = require("express");
const userRoutes = require("./routes/user_routes");
const courseRoute = require("./routes/course_routes");
const adminRoutes = require("./routes/admin");
const connectDB = require("./DB/db");
const app = express();
app.use(express.json());
connectDB();
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoute);
app.use("api/v1/admin", adminRoutes);

app.listen(3000);
