import React, { useState, useEffect } from "react";

const Blog = React.forwardRef((props, ref) => {
  const [showEverything, setEverythingVisible] = useState(false);
  const [showDelete, setDeleteShow] = useState(false);

  const toggleEverything = () => {
    setEverythingVisible(!showEverything);
  };

  const showingDelete = () => {
    if (props.username === props.blog.user.username) {
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
      <div style={hide}>
        {props.blog.title} {props.blog.author}
      </div>
      <div style={show}>
        <table>
          <tbody>
            <tr>
              <td>
                <b>Title:</b>
              </td>
              <td>{props.blog.title}</td>
            </tr>
            <tr>
              <td>
                <b>Author:</b>
              </td>
              <td>{props.blog.author}</td>
            </tr>
            <tr>
              <td>
                <b>URL:</b>
              </td>
              <td>{props.blog.url}</td>
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
});

export default Blog;
