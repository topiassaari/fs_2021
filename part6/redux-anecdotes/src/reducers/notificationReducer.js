const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET":
      const content = `vote added to ${action.data.content}`;
      return content;
    case "REMOVE":
      return "";
    default:
      return state;
  }
};
export const setNotification = (content) => {
  return {
    type: "SET",
    data: {
      content,
    },
  };
};
export const removeNotification = () => {
  return {
    type: "REMOVE",
  };
};
export default notificationReducer;
