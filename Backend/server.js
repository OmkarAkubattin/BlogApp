require("dotenv").config();
const express = require("express");
const mongoose = require("./src/config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://blog-yvzoqwchk-omkarakubattins.vercel.app", // Frontend URL
  credentials: true,
}));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
