import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog, getAll } from "../reducers/blogReducer";
import { TextField, Button, Typography } from "@material-ui/core";

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
      <Typography variant="h5">add blog</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField label="title" id="title" type="text" name="title" />
        </div>
        <div>
          <TextField label="author" id="author" type="text" name="author" />
        </div>
        <div>
          <TextField label="url" id="url" type="text" name="url" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          save
        </Button>
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
