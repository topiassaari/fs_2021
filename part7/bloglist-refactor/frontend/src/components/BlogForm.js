import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog, getAll } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      author: event.target.author.value,
      url: event.target.url.value,
      title: event.target.title.value,
    };
    dispatch(createBlog(newBlog))
      .then(() => {
        dispatch(
          setNotification(
            ` ${newBlog.title} by ${newBlog.author} added`,
            "success",
            5
          )
        );
        //blogFormRef.current.toggleVisibility();
        dispatch(getAll());
      })
      .catch((err) => {
        console.log(err);
        dispatch(setNotification("adding new blog failed", "error", 5));
      });
    event.target.reset();
  };

  return (
    <div>
      <h2>add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id="title" type="text" name="title" />
        </div>
        <div>
          author:
          <input id="author" type="text" name="author" />
        </div>
        <div>
          url:
          <input id="url" type="text" name="url" />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleInputChange: PropTypes.func,
  author: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
};

export default BlogForm;
