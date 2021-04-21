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

const update = (anecdote, updatedAnecdote) => {
  const req = axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote);
  return req.then((res) => res.data);
};

export default { getAll, create, update };
