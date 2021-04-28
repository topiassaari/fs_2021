import React from "react";
import { userLogin } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { TextField, Button } from "@material-ui/core";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in ", event.target.username.value);
    dispatch(
      userLogin(event.target.username.value, event.target.password.value)
    )
      .then(() => {
        setNotification(`welcome ${event.target.username.value}`, "success", 5);
      })
      .catch((err) => {
        setNotification("wrong username or password", "error", 5);
        console.log(err);
      });
  };
  return (
    <div>
      <h2>Login</h2>
      <form id="loginForm" onSubmit={handleLogin}>
        <div>
          <TextField label="username" id="username" name="username" />
        </div>
        <div>
          <TextField
            label="password"
            id="password"
            type="password"
            name="password"
          />
        </div>
        <Button variant="contained" color="primary" id="login" type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
