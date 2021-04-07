const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");
const api = supertest(app);
const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("when blogs the api returns", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of helper.blogs) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
  });
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
  test(" id instead of _id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    });
  });
  test(" a valid id", async () => {
    const blogsAtStart = await helper.blogsInDB();

    const blog = blogsAtStart[0];

    const result = await api
      .get(`/api/blogs/${blog.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const prosessed = JSON.parse(JSON.stringify(blog));

    expect(result.body).toEqual(prosessed);
  });
  test(" can't post without login", async () => {
    await api
      .post("/api/blogs")
      .send({
        title: "Taikaa muumimaailmassa",
        author: "Hän Itse",
        url: "www.jee.com",
        likes: 2,
      })
      .expect(401);
  });
});

describe("after logging in ", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("salajuttui", 10);
    const user = new User({ username: "kayttaja", passwordHash });
    await user.save();
  });
  test(" a blog post is added correctly", async () => {
    const login = await api
      .post("/api/login")
      .send({ username: "kayttaja", password: "salajuttui" })
      .expect(200);

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${login.body.token}`)
      .send({
        title: "Taikaa muumimaailmassa",
        author: "Hän Itse",
        url: "www.jee.com",
        likes: 2,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test(" deleting blog succeeds with 204", async () => {
    const login = await api
      .post("/api/login")
      .send({ username: "kayttaja", password: "salajuttui" })
      .expect(200);

    const blog = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${login.body.token}`)
      .send({
        title: "Taikaa muumimaailmassa",
        author: "Hän Itse",
        url: "www.jee.com",
        likes: 2,
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    await api.get(`/api/blogs/${blog.body.id}`).expect(200);
    await api
      .delete(`/api/blogs/${blog.body.id}`)
      .set("Authorization", `bearer ${login.body.token}`)
      .expect(204);
  });
  test(" undefined author and url causes error", async () => {
    const login = await api
      .post("/api/login")
      .send({ username: "kayttaja", password: "salajuttui" })
      .expect(200);

    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${login.body.token}`)
      .send({
        title: "Taikaa muumimaailmassa",
        likes: 2,
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});
describe("for new blogs ", () => {
  test(" undefined likes defaults to zero", async () => {
    const newBlog = new Blog({
      title: "Taikaa muumimaailmassa",
      author: "Hän Itse",
      url: "www.jee.com",
    });
    await newBlog.save();
    const response = await api.get("/api/blogs");
    const addedBlog = response.body.find((a) => a.id === newBlog.id);
    expect(addedBlog.likes).toBe(0);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("salajuttui", 10);
    const user = new User({ username: "kayttaja", passwordHash });
    await user.save();
  });

  test(" creation of new user succeeds", async () => {
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

    const allUsers = usersAtEnd.map((u) => u.username);
    expect(allUsers).toContain(newUser.username);
  });

  describe("when creating a new user", () => {
    beforeEach(async () => {
      await User.deleteMany({});
    });
    test(" too short username is not added", async () => {
      const usersAtStart = await helper.usersInDb();
      const shortUser = {
        username: "us",
        name: "Fist Last",
        password: "supasegret",
      };
      await api.post("/api/users").send(shortUser).expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test(" too short password is not added", async () => {
      const usersAtStart = await helper.usersInDb();
      const shortPassword = {
        username: "usero",
        name: "Fist Last",
        password: "su",
      };
      await api.post("/api/users").send(shortPassword).expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test(" user with undefined username is not sent to db", async () => {
      const usersAtStart = await helper.usersInDb();
      const noUsername = {
        name: "Fist Last",
        password: "su",
      };
      await api.post("/api/users").send(noUsername).expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
    test(" undefined pw is not added", async () => {
      const usersAtStart = await helper.usersInDb();
      const noPassword = {
        username: "usero",
        name: "Fist Last",
      };
      await api.post("/api/users").send(noPassword).expect(400);
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
