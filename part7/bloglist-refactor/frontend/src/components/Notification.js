import React from "react";
const Notification = (props) => {
  if (props.success) {
    return <div className={"success"}>{props.success}</div>;
  }
  if (props.error) {
    return <div className={"error"}>{props.error}</div>;
  } else return null;
};

export default Notification;
