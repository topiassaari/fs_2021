import React from "react";

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleSubmit}>
        <div>
          username
          <input value={props.username} onChange={props.handleUsername} />
        </div>
        <div>
          password
          <input
            type="password"
            value={props.password}
            onChange={props.handlePassword}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
