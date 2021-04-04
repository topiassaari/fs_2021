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
    res.status(201).json(result.toJSON());
  });
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
