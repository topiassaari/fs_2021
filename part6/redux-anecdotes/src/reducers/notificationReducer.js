let timer;
const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      return action.data.content;
    case "REMOVE":
      return "";
    default:
      return state;
  }
};
const addNotification = (content) => {
  return {
    type: "SET",
    data: {
      content,
    },
  };
};
const removeNotification = () => {
  return {
    type: "REMOVE",
  };
};
export const setNotification = (content, time) => {
  if (timer) {
    clearTimeout(timer);
  }
  return async (dispatch) => {
    dispatch(addNotification(content));
    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationReducer;
