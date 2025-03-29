const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    console.log("User:", req.user); // Check if user is available

    const { title, content } = req.body;
    if (!req.user || !req.user.userId) {
      return res.status(403).json({ message: "Unauthorized: No user found in token" });
    }

    const blog = new Blog({ title, content, author: req.user.userId });
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name").sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};


exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.user.userId)
      return res.status(403).json({ message: "Unauthorized" });

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};



