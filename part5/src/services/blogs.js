import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, newBlog, config);
  return res.data;
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, deleteBlog };
