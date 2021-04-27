let timer;
const notificationReducer = (state = "", action) => {
  switch (action.type) {
  case "SET":
    return action.data;
  case "REMOVE":
    return "";
  default:
    return state;
  }
};
const addNotification = (content, type) => {
  return {
    type: "SET",
    data: {
      content,
      type,
    },
  };
};
const removeNotification = () => {
  return {
    type: "REMOVE",
  };
};
export const setNotification = (content, type, time) => {
  if (timer) {
    clearTimeout(timer);
  }
  return async (dispatch) => {
    dispatch(addNotification(content,type));
    timer = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export default notificationReducer;
