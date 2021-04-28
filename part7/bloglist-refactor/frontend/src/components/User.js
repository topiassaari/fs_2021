import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography, List, ListItemText } from "@material-ui/core";
const User = () => {
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const match = useRouteMatch("/user/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;
  if (!user) {
    return null;
  }
  return (
    <div>
      <Typography variant="h5">{user.name}</Typography>
      <List>
        {user.blogs.map((blog) => {
          const b = blogs.find((b) => b.id === blog.id);
          return <ListItemText key={blog.id}>{b.title}</ListItemText>;
        })}
      </List>
    </div>
  );
};

export default User;
