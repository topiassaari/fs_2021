import React from "react";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <form id="loginForm" onSubmit={props.handleSubmit}>
        <div>
          username
          <input
            id="username"
            value={props.username}
            onChange={props.handleUsername}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={props.password}
            onChange={props.handlePassword}
          />
        </div>
        <button id="login" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
