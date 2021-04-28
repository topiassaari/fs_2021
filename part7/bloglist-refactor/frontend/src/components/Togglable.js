import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const show = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hide}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.label}
        </Button>
      </div>
      <div style={show}>
        {props.children}
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});
Togglable.propTypes = {
  label: PropTypes.string.isRequired,
  blog: PropTypes.object,
};
Togglable.displayName = "Togglable";

export default Togglable;
