/* eslint-disable indent */
import loginService from "../services/login";
import blogService from "../services/blogs";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      return action.data;
    case "LOGOUT":
      return action.data;
    case "VALIDATE":
      return action.data;
    default:
      return state;
  }
};
export const userValidation = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    const user = JSON.parse(loggedUserJSON);
    if (loggedUserJSON) {
      await blogService.setToken(user.token);
      dispatch({
        type: "VALIDATE",
        data: user,
      });
    }
  };
};
export const userLogin = (username, password) => {
  return async (dispatch) => {
    const login = await loginService.login({
      username,
      password,
    });
    await blogService.setToken(login.token);
    window.localStorage.setItem("loggedUser", JSON.stringify(login));

    dispatch({
      type: "LOGIN",
      data: login,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await window.localStorage.removeItem("loggedUser");
    dispatch({
      type: "LOGOUT",
      data: [],
    });
  };
};

export default userReducer;
