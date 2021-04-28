/* eslint-disable indent */
import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "GET":
      return action.data;
    case "NEW":
      return [...state, action.data];
    case "LIKE":
      return state.map((a) => (a.id !== action.data.id ? a : action.data));
    case "COMMENT":
      return state.map((a) => (a.id !== action.data.id ? a : action.data));
    default:
      return state;
  }
};
export const getAll = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "GET",
      data: blogs,
    });
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: "NEW",
      data: newBlog,
    });
  };
};
export const like = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, {
      likes: blog.likes + 1,
    });
    dispatch({
      type: "LIKE",
      data: likedBlog,
    });
  };
};
export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.deleteBlog(blog.id);
    dispatch({
      type: "DELETE",
      data: deletedBlog,
    });
  };
};
export const addComment = (blog, content) => {
  return async (dispatch) => {
    const commented = await blogService.comment(blog.id, content);
    dispatch({
      type: "COMMENT",
      data: commented,
    });
  };
};

export default blogReducer;
