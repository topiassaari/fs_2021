const mongoose = require("mongoose");
var _ = require("lodash");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("../utils/test_helper");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

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
  await api.post("/api/blogs", blogObject).expect(401);
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("salajuttui", 10);
    const user = new User({ username: "kayttaja", passwordHash });

    await user.save();
  });

  test(" creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "usero",
      name: "Fist Last",
      password: "supasegret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test(" too short username causes error", async () => {
    const shortUser = {
      username: "us",
      name: "Fist Last",
      password: "supasegret",
    };
    await api.post("/api/users").send(shortUser).expect(400);
  });
  test(" too short password causes error", async () => {
    const shortPassword = {
      username: "usero",
      name: "Fist Last",
      password: "su",
    };
    await api.post("/api/users").send(shortPassword).expect(400);
  });
  test(" undefined user causes error", async () => {
    const noUsername = {
      name: "Fist Last",
      password: "su",
    };
    await api.post("/api/users").send(noUsername).expect(400);
  });
  test(" undefined pw causes error", async () => {
    const noPassword = {
      username: "usero",
      name: "Fist Last",
    };
    await api.post("/api/users").send(noPassword).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
