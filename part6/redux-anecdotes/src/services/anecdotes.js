import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (a) => {
  const anecdote = { content: a, votes: 0 };
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};

export default { getAll, create };
