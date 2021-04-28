import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import React from "react";
const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  return notification === "" ? null : (
    <Alert severity={notification.type}>{notification.content}</Alert>
  );
};

export default Notification;
