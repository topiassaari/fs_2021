import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    case "NEW":
      return [...state, action.data];
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update(anecdote, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    const id = anecdote.id;
    dispatch({
      type: "VOTE",
      data: { id },
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAne = await anecdoteService.create(content);
    dispatch({
      type: "NEW",
      data: newAne,
    });
  };
};

export const initialize = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
