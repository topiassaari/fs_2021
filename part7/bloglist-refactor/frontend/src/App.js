import React, { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";

import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const usero = JSON.parse(loggedUserJSON);
      setUser(usero);
      blogService.setToken(usero.token);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    console.log("logging in ", username);
    loginService
      .login({
        username,
        password,
      })
      .then((res) => {
        window.localStorage.setItem("loggedUser", JSON.stringify(res));
        blogService.setToken(res.token);
        setUser(res);
        setUsername("");
        setPassword("");
        setSuccess(`welcome ${res.username}`);
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      })
      .catch((err) => {
        setError("wrong username or password");
        console.log(err);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  const handleLogout = (event) => {
    event.preventDefault();
    console.log("logging out");

    window.localStorage.removeItem("loggedUser");

    setUser(null);
    setUsername("");
    setPassword("");

    blogService
      .setToken(null)
      .then(() => {
        setSuccess("logged out");
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      })
      .catch((err) => {
        setError("logout failed");
        console.log(err);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returned) => {
        setBlogs(blogs.concat(returned));
        setSuccess(
          `new blog ${blogObject.title} by ${blogObject.author} added`
        );
        blogFormRef.current.toggleVisibility();
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
      })
      .catch((err) => {
        setError("adding blog failed");
        console.log(err);
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  const updateLikes = (blog) => {
    blogService
      .update(blog.id, {
        likes: blog.likes + 1,
      })
      .then((returned) => {
        blogService
          .getAll()
          .then((blogs) => setBlogs(blogs))
          .then(() => {
            setSuccess(`Like added to ${returned.author}`);
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
          });
      })
      .catch(() => {
        setError("liking failed");
        setTimeout(() => {
          setError(null);
        }, 5000);
      });
  };
  const handleDelete = (blog) => {
    var result = window.confirm(`delete ${blog.author}?`);
    if (result === true) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          blogService
            .getAll()
            .then((blogs) => setBlogs(blogs))
            .then(() => {
              setSuccess("blog deleted");
              setTimeout(() => {
                setSuccess(null);
              }, 5000);
            });
        })
        .catch((err) => {
          setError("failed to delete");
          console.log(err);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
    }
  };
  const loginForm = () => (
    <Togglable label="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsername={({ target }) => setUsername(target.value)}
        handlePassword={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable label="new blog" ref={blogFormRef}>
      <BlogForm createBlog={createBlog} />
    </Togglable>
  );
  return (
    <div>
      <Notification success={success} error={error} />
      <h1>Bloglist</h1>
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
          <div id="listOfBlogs">
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  username={user.username}
                  blog={blog}
                  handleLike={() => updateLikes(blog)}
                  handleDelete={() => handleDelete(blog)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
