import React, { useEffect } from "react";

import Blogs from "./components/Blogs";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./reducers/blogReducer";
import { userValidation, logout } from "./reducers/userReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  //const blogFormRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  useEffect(() => {
    dispatch(userValidation());
  }, []);
  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout())
      .then(() => {
        setNotification("logged out", "success", 5);
      })
      .catch((err) => {
        setNotification("logout failed", "error", 5);
        console.log(err);
      });
  };

  const loginForm = () => (
    <Togglable label="log in">
      <LoginForm />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable /*ref={blogFormRef}*/ label="new blog">
      <BlogForm />
    </Togglable>
  );

  return (
    <div>
      <Notification />
      <h1>Bloglist</h1>
      {!user.token ? (
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
            <Blogs />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
