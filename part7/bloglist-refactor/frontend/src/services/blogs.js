import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  if (newToken) {
    token = `bearer ${newToken}`;
    return token;
  }
  return null;
};
const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const req = await axios.post(baseUrl, newBlog, config);
  return req.data;
};

const update = (id, updatedBlog) => {
  const req = axios.put(`${baseUrl}/${id}`, updatedBlog);
  return req.then((res) => res.data);
};
const deleteBlog = (id) => {
  const config = { headers: { Authorization: token } };
  const req = axios.delete(`${baseUrl}/${id}`, config);
  return req.then((res) => res.data);
};
const comment = async (id, comment) => {
  console.log(comment);
  const req = await axios.post(`${baseUrl}/${id}/comments`, {
    content: comment,
  });
  return req.data;
};

export default {
  getAll,
  setToken,
  create,
  update,
  deleteBlog,
  comment,
};
