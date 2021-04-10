import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in ", username);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setSuccess(`Welcome ${username}`);
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (exception) {
      setError("wrong username or password");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("logging out");
    try {
      window.localStorage.removeItem("loggedUser");
      blogService.setToken(null);
      setUser(null);
      setUsername("");
      setPassword("");
      setSuccess("logged out");
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (exception) {
      setError("logout failed");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl,
    };
    try {
      blogService.create(blogObject).then((returned) => {
        setBlogs(blogs.concat(returned));
        setNewBlogAuthor("");
        setNewBlogTitle("");
        setNewBlogUrl("");
        setSuccess(`new blog ${newBlogTitle} by ${newBlogAuthor} added`);
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      });
    } catch (exception) {
      setError("adding blog failed");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>log in to app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    <div>
      <h2>add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlogTitle}
            name="title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlogAuthor}
            name="title"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlogUrl}
            name="title"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
  return (
    <div>
      <Notification success={success} error={error} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>blogs</h2>
          <div style={{ marginBottom: "20px" }}>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          {blogForm()}
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
