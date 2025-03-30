require("dotenv").config();
const express = require("express");
const mongoose = require("./src/config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const authRoutes = require("./src/routes/authRoutes");
const blogRoutes = require("./src/routes/blogRoutes");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://blog-app-one-tau-34.vercel.app",
    "https://blog-yvzoqwchk-omkarakubattins.vercel.app"
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(process.env.PORT || 5000);
 });
app.get('/api', (req, res) => {
 res.send("working");
});

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
