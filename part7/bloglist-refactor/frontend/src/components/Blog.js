import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, like, getAll, addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const blogs = useSelector((state) => state.blogs);

  const match = useRouteMatch("/blog/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

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
  const submitComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    console.log(event.target.comment.value);
    dispatch(addComment(blog, comment))
      .then(() => {
        dispatch(setNotification("comment added", "success", 5));
        event.target.reset();
      })
      .catch((err) => {
        console.log(err);
        dispatch(setNotification("adding comment failed", "error", 5));
      });
  };
  if (!blog) {
    return null;
  }

  return (
    <>
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
          style={{
            display: login.username === blog.user.username ? "block" : "none",
          }}
          onClick={() => handleDelete(blog)}
        >
          delete
        </button>
      </div>
      <div>
        <h2>Comments</h2>
        <form onSubmit={submitComment}>
          <input name="comment" type="text" />
          <button type="submit">comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => {
            return <li key={comment}>{comment}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default Blog;
