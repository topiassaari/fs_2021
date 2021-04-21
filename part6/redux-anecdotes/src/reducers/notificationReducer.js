const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      const content = action.data.content;
      return content;
    case "REMOVE":
      return "";
    default:
      return state;
  }
};
export const setNotification = (content, time) => {
  return async (dispatch) => {
    await dispatch({
      type: "SET",
      data: {
        content,
      },
    });
    setTimeout(() => {
      dispatch({ type: "REMOVE" });
    }, time * 1000);
  };
};

export const removeNotification = () => {
  return {
    type: "REMOVE",
  };
};
export default notificationReducer;
