import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries";
const Recommended = (props) => {
  const [booksByGenre, setBooks] = useState([]);
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    getBooks({ variables: { genre: props.me.favoriteGenre } });
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [getBooks, props.me.favoriteGenre, result.data]);
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <span>
        books in your favourite genre: <b>{props.me.favoriteGenre}</b>
      </span>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksByGenre ? (
            booksByGenre
              .filter((b) => b.genres.includes(props.me.favoriteGenre))
              .map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
          ) : (
            <tr>
              <td>NO RECCS</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
