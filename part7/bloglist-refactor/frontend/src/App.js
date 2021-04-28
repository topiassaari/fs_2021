import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import LoginForm from "./components/Login";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Menu from "./components/Menu";
import User from "./components/User";
import UserList from "./components/UserList";

import { useDispatch, useSelector } from "react-redux";
import { getAll } from "./reducers/blogReducer";
import { userValidation, logout } from "./reducers/loginReducer";
import { setNotification } from "./reducers/notificationReducer";
import { getAllUsers } from "./reducers/usersReducer";

import { Container, Button, AppBar, Typography } from "@material-ui/core";

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
    <Container>
      <div>
        {!login.token ? (
          loginForm()
        ) : (
          <>
            <AppBar
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Menu />

              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography style={{ paddingRight: "8px" }}>
                  {login.username} logged in
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </div>
            </AppBar>
            <div style={{ marginTop: "100px" }}>
              <Notification />
              <Switch>
                <Route path="/blogs">
                  <Typography variant="h2">blogs</Typography>
                  <div id="listOfBlogs">
                    <Blogs />
                  </div>
                  {blogForm()}
                </Route>
                <Route path="/blog/:id">
                  <Blog />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:id">
                  <User />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default App;
