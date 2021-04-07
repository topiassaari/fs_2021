const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", async (req, res) => {
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: user._id,
  });

  if ((blog.author && blog.url) === undefined) {
    res.status(400).json({ error: "author and url missing" });
  }
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  res.status(201).json(result.toJSON());
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

blogRouter.put("/:id", async (req, res) => {
  const blogLikes = {
    likes: req.body.likes,
  };
  const updated = await Blog.findByIdAndUpdate(req.params.id, blogLikes, {
    new: true,
  });
  if (updated) {
    res.json(updated.toJSON());
  } else {
    res.status(404).end();
  }
});

module.exports = blogRouter;
