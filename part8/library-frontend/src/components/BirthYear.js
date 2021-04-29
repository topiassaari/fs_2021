import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_AUTHOR, AUTHORS } from "../queries";

const BirthYear = (props) => {
  const [name, setName] = useState("");
  const [year, setYear] = useState(0);

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    changeBorn({ variables: { name, year } });

    setName("");
    setYear(0);
  };

  return (
    <div>
      <h2>change birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {props.authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          birthyear
          <input
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">change birth</button>
      </form>
    </div>
  );
};

export default BirthYear;
