import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, like, getAll } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = (props) => {
  const [showEverything, setEverythingVisible] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);
  const user = useSelector((state) => state.user);

  const toggleEverything = () => {
    setEverythingVisible(!showEverything);
  };

  const showingDelete = () => {
    if (user.username === props.blog.user.username) {
      setDeleteShow(true);
    } else setDeleteShow(false);
  };

  useEffect(() => {
    showingDelete();
  });

  const hide = { display: showEverything ? "none" : "" };
  const show = { display: showEverything ? "" : "none" };

  return (
    <div
      onClick={showingDelete}
      style={{
        padding: 10,
        border: "solid",
        borderWidth: 2,
        marginBottom: 10,
      }}
    >
      <button onClick={toggleEverything}>
        {showEverything === true ? "hide" : "view"}
      </button>
      <div style={hide} className="smallContent">
        {props.blog.title} {props.blog.author}
      </div>
      <div style={show} className="fullContent">
        <table>
          <tbody>
            <tr>
              <td>
                <b>Title:</b>
              </td>
              <td id="title">{props.blog.title}</td>
            </tr>
            <tr>
              <td>
                <b>Author:</b>
              </td>
              <td id="author">{props.blog.author}</td>
            </tr>
            <tr>
              <td>
                <b>URL:</b>
              </td>
              <td id="url">{props.blog.url}</td>
            </tr>
            <tr>
              <td>
                <b>Likes:</b>
              </td>
              <td>{props.blog.likes}</td>
              <td>
                <button onClick={props.handleLike}>like</button>
              </td>
            </tr>
            <tr>
              <td>
                <b>Added by:</b>
              </td>
              <td>{props.blog.user.username}</td>
            </tr>
          </tbody>
        </table>

        <button
          style={{ display: showDelete ? "" : "none" }}
          onClick={props.handleDelete}
        >
          delete
        </button>
      </div>
    </div>
  );
};
Blog.propTypes = {
  username: PropTypes.string,
  handleLike: PropTypes.func,
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func,
};
Blog.displayName = "Togglable";

const Blogs = () => {
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

  const blogs = useSelector((state) => state.blogs);
  return blogs
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={() => updateLikes(blog)}
        handleDelete={() => handleDelete(blog)}
      />
    ));
};

export default Blogs;
