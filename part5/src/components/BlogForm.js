import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    url: "",
    author: "",
    title: "",
  });
  const handleInputChange = (event) => {
    event.persist();
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      author: newBlog.author,
      url: newBlog.url,
      title: newBlog.title,
    });
    setNewBlog({
      url: "",
      author: "",
      title: "",
    });
  };
  return (
    <div>
      <h2>add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newBlog.title}
            name="title"
            onChange={handleInputChange}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={newBlog.author}
            name="author"
            onChange={handleInputChange}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newBlog.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func,
  author: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
};

export default BlogForm;
