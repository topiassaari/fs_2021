import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, like, getAll } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const login = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);
  useEffect(() => {
    if (login.username === blog.user.username) {
      setDeleteShow(true);
    } else setDeleteShow(false);
  });

  const match = useRouteMatch("/blog/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  const [showDelete, setDeleteShow] = useState(false);

  const dispatch = useDispatch();
  const updateLikes = (blog) => {
    dispatch(like(blog))
      .then(() => {
        dispatch(setNotification(`Like added to ${blog.author}`, "success", 5));
        dispatch(getAll());
      })
      .catch((err) => {
        dispatch(setNotification("liking failed", "error", 5));
        console.log(err);
      });
  };
  const handleDelete = (blog) => {
    var result = window.confirm(`delete ${blog.author}?`);
    if (result === true) {
      dispatch(deleteBlog(blog))
        .then(() => {
          dispatch(setNotification("blog deleted", "success", 5));
          dispatch(getAll());
        })
        .catch(() => {
          dispatch(setNotification("failed to deleter", "success", 5));
        });
    }
  };
  if (!blog) {
    return null;
  }
  return (
    <div>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <li>
        <a href={blog.url}>{blog.url}</a>
      </li>
      <li>
        Likes: {blog.likes}
        <button onClick={() => updateLikes(blog)}>like </button>
      </li>
      <li>Added by: {blog.user.username}</li>
      <button
        style={{ display: showDelete ? "" : "none" }}
        onClick={() => handleDelete(blog)}
      >
        delete
      </button>
    </div>
  );
};

export default Blog;
