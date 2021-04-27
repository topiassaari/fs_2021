/* eslint-disable indent */

import usersService from "../services/users";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "USERS":
      return action.data;
    default:
      return state;
  }
};
export const getAllUsers = () => {
  return async (dispatch) => {
    const allUsers = await usersService.getAllUsers();
    dispatch({
      type: "USERS",
      data: allUsers,
    });
  };
};

export default usersReducer;
