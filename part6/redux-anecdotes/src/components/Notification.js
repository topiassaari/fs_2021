import { connect } from "react-redux";
import React from "react";

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return props.notification === "" ? null : (
    <div style={style}>{props.notification}</div>
  );
};
const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  };
};

export default connect(mapStateToProps)(Notification);
