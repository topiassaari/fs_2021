import React from "react";
const Recommended = (props) => {
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
          {props.me.favoriteGenre ? (
            props.books
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
