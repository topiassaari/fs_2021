import React from "react";
import { userLogin } from "../reducers/userReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

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
          username
          <input id="username" name="username" />
        </div>
        <div>
          password
          <input id="password" type="password" name="password" />
        </div>
        <button id="login" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
