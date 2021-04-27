import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Blogs from "./components/Blogs";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import User from "./components/User";
import UserList from "./components/UserList";

import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./reducers/blogReducer";
import { userValidation, logout } from "./reducers/loginReducer";
import { setNotification } from "./reducers/notificationReducer";
import { getAllUsers } from "./reducers/usersReducer";

const App = () => {
  //const blogFormRef = useRef();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(getAll());
    dispatch(getAllUsers());
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
      {!login.token ? (
        loginForm()
      ) : (
        <div>
          <div style={{ marginBottom: "20px" }}>
            {login.username} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Switch>
            <Route path="/blogs">
              <h2>blogs</h2>
              {blogForm()}
              <div id="listOfBlogs">
                <Blogs />
              </div>
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:id">
              <User />
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
};

export default App;
