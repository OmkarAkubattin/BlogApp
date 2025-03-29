const express = require("express");
const { createBlog, getAllBlogs, getBlogById, deleteBlog, updateBlog } = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", authMiddleware, createBlog);
router.delete("/:id", authMiddleware, deleteBlog);
router.put("/:id", authMiddleware, updateBlog);



module.exports = router;
