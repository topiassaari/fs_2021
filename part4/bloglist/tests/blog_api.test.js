const mongoose = require("mongoose");
var _ = require("lodash");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("../utils/test_helper");
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.blogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe("The API returns", () => {
  test(" blogs as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test(" all blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.blogs.length);
  });
});
describe("The blogs have", () => {
  test(" id instead of _id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });
});

describe("A new blog post ", () => {
  test(" is added correctly", async () => {
    const newBlog = new Blog({
      title: "Taikaa muumimaailmassa",
      author: "Hän Itse",
      url: "www.jee.com",
      likes: 2,
    });
    let blogObject = new Blog(newBlog);
    await blogObject.save();
    const response = await api.get("/api/blogs");
    const ids = _.map(response.body, "id");
    expect(response.body).toHaveLength(helper.blogs.length + 1);
    expect(ids).toContain(newBlog.id);
  });
  test(" undefined likes defaults to zero", async () => {
    const newBlog = new Blog({
      title: "Taikaa muumimaailmassa",
      author: "Hän Itse",
      url: "www.jee.com",
    });
    let blogObject = new Blog(newBlog);
    await blogObject.save();
    const response = await api.get("/api/blogs");
    const addedBlog = response.body.find((a) => a.id === newBlog.id);
    expect(addedBlog.likes).toBe(0);
  });
});
test(" undefined author and url causes error", async () => {
  const newBlog = new Blog({
    title: "Taikaa muumimaailmassa",
  });
  let blogObject = new Blog(newBlog);
  const response = await api.post("/api/blogs", blogObject);
  expect(response.status).toBe(400);
});
afterAll(() => {
  mongoose.connection.close();
});
