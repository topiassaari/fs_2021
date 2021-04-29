import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BirthYear from "./components/BirthYear";
import NewBook from "./components/NewBook";
import { BOOKS, AUTHORS } from "./queries";
import { useQuery } from "@apollo/client";

const App = () => {
  const books = useQuery(BOOKS);
  const authors = useQuery(AUTHORS);
  const [page, setPage] = useState("authors");

  if (books.loading || authors.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Authors show={page === "authors"} authors={authors.data.allAuthors} />
      <BirthYear show={page === "authors"} authors={authors.data.allAuthors} />

      <Books show={page === "books"} books={books.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
