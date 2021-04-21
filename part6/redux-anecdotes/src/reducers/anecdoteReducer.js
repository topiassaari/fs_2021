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

export const addVote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createAnecdote = (data) => {
  return {
    type: "NEW",
    data,
  };
};

export const initialize = (anecdotes) => {
  return {
    type: "INIT",
    data: anecdotes,
  };
};

export default anecdoteReducer;
