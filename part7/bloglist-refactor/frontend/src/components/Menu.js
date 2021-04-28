import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Menu = () => {
  const styling = {
    paddingRight: 5,
    color: "white",
  };
  return (
    <div>
      <Button color="inherit">
        <Link style={styling} to="/blogs">
          blogs
        </Link>
      </Button>
      <Button color="inherit">
        <Link style={styling} to="/users">
          users
        </Link>
      </Button>
    </div>
  );
};

export default Menu;
