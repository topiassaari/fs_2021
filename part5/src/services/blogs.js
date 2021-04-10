import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl} /${id}`, newObject);
  return req.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update };
