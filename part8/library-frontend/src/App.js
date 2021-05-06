import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import Recommended from "./components/Recommended";

import NewBook from "./components/NewBook";
import { BOOKS, AUTHORS, ME } from "./queries";
import { useQuery, useApolloClient } from "@apollo/client";

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
  const books = useQuery(BOOKS);
  const authors = useQuery(AUTHORS);
  const me = useQuery(ME);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  useEffect(() => {
    let existingToken = localStorage.getItem("userToken");
    if (existingToken) {
      setToken(existingToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };
  if (books.loading || authors.loading) {
    return <div>loading...</div>;
  }
  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <Login setToken={setToken} setError={notify} />
      </div>
    );
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recs")}>recommended</button>
        <button onClick={() => logout()}>logout</button>
      </div>
      <Authors show={page === "authors"} authors={authors.data.allAuthors} />

      <Books show={page === "books"} books={books.data.allBooks} />

      <NewBook show={page === "add"} />
      <Recommended
        show={page === "recs"}
        me={me.data.me}
        books={books.data.allBooks}
      />
    </div>
  );
};

export default App;
