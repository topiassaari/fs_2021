const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});
blogRouter.post("/", (req, res) => {
  const blog = new Blog(req.body);
  if ((blog.author && blog.url) === undefined) {
    res.status(400).json({ error: "author and url missing" });
  }
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRouter;
