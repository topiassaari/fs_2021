import React from "react";
import PropTypes from "prop-types";

const BlogForm = (props) => {
  return (
    <div>
      <h2>add blog</h2>
      <form onSubmit={props.submit}>
        <div>
          title:
          <input
            type="text"
            value={props.title}
            name="title"
            onChange={props.handleTitle}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={props.author}
            name="title"
            onChange={props.handleAuthor}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={props.url}
            name="title"
            onChange={props.handleUrl}
          />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  submit: PropTypes.string.isRequired,
  handleUrl: PropTypes.string.isRequired,
  handleTitle: PropTypes.string.isRequired,
  handleAuthor: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BlogForm;
