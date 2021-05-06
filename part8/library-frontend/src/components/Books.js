import React, { useEffect, useState } from "react";
const Books = (props) => {
  const [filter, setFilter] = useState("all");
  const [genres, setGenres] = useState(["all"]);
  useEffect(() => {
    props.books.forEach((book) => {
      book.genres.forEach((genre) => {
        if (genres.includes(genre) === false) {
          setGenres([...genres, genre]);
        }
      });
    }, props.books);
  });
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <span>
        show books by genre:{" "}
        <select
          value={filter}
          onChange={({ target }) => setFilter(target.value)}
        >
          {genres.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setFilter("all");
          }}
        >
          clear
        </button>
      </span>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filter === "all"
            ? props.books.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
            : props.books
                .filter((b) => b.genres.includes(filter))
                .map((b) => (
                  <tr key={b.title}>
                    <td>{b.title}</td>
                    <td>{b.author.name}</td>
                    <td>{b.published}</td>
                  </tr>
                ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
