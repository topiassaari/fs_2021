import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

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
      <h2>{user.name}</h2>
      <ul>
        {user.blogs.map((blog) => {
          const b = blogs.find((b) => b.id === blog.id);
          return <li key={blog.id}>{b.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default User;
