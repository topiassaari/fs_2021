import { useSelector } from "react-redux";
import React from "react";
const Notification = () => {
  const notification = useSelector((state) => state.notifications);
  return notification === "" ? null : (
    <div className={notification.type}>{notification.content}</div>
  );
};

export default Notification;
