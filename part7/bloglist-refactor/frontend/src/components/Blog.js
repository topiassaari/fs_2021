import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, like, getAll, addComment } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import {
  TextField,
  Button,
  Typography,
  List,
  ListItemText,
  Link,
  ListItem,
} from "@material-ui/core";

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
        <div
          style={{ border: "1px solid black", margin: "30px", padding: "10px" }}
        >
          <Typography variant="h4">
            {blog.title} by {blog.author}
          </Typography>
          <ListItemText>
            <Link href={blog.url}>{blog.url}</Link>
          </ListItemText>
          <ListItemText>Likes: {blog.likes}</ListItemText>

          <ListItemText>Added by: {blog.user.username}</ListItemText>

          <ListItem>
            {" "}
            <Button
              variant="contained"
              size="small"
              onClick={() => updateLikes(blog)}
            >
              like{" "}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{
                display:
                  login.username === blog.user.username ? "block" : "none",
              }}
              onClick={() => handleDelete(blog)}
            >
              delete
            </Button>
          </ListItem>
        </div>

        <div
          style={{ border: "1px solid black", margin: "30px", padding: "10px" }}
        >
          <Typography style={{ paddingTop: "10px" }} variant="h5">
            Comments:
          </Typography>
          <List>
            {blog.comments.map((comment) => {
              return <ListItemText key={comment}>{comment}</ListItemText>;
            })}
          </List>
        </div>
      </div>
      <form onSubmit={submitComment}>
        <TextField label="comment" name="comment" type="text" />
        <Button variant="contained" color="primary" size="small" type="submit">
          submit
        </Button>
      </form>
    </>
  );
};

export default Blog;
