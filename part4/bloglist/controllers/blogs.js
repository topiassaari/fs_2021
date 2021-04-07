const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

blogRouter.post("/", middleware.userExtractor, async (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
    user: req.user._id,
  });

  if ((blog.author && blog.url) === undefined) {
    res.status(400).json({ error: "author and url missing" });
  }
  const result = await blog.save();
  req.user.blogs = req.user.blogs.concat(result._id);
  await req.user.save();
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

blogRouter.delete("/:id", middleware.userExtractor, async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog.user.toString() === req.user.id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
  }
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
