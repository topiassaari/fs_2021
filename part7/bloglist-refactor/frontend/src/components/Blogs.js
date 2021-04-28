import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => (
      <div
        key={blog.id}
        style={{
          padding: 10,
          border: "solid",
          borderWidth: 2,
          marginBottom: 10,
        }}
      >
        <Link to={`/blog/${blog.id}`}>
          {blog.title} {blog.author}{" "}
        </Link>
      </div>
    ));
};

export default Blogs;
