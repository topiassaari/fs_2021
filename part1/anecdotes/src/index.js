import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  return <button onClick={props.changeValue}>{props.text}</button>;
};
const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [point, setPoints] = useState([0, 0, 0, 0, 0, 0]);
  const [mostVotes, setMostVotes] = useState(0);

  const vote = () => {
      const copy = [...point]
      copy[selected] += 1
      setPoints(copy)
      if (copy[selected] > copy[mostVotes]) {
          setMostVotes(selected)
      }
  }
return (
    <div>
      <div>
      <div>
      <h1>Anecdote of the day</h1>
      <p><i>"{props.anecdotes[selected]}"</i><br/>
        has {point[selected]} votes</p>
      </div>
      <Button text="vote" changeValue={() => vote()} />
      <Button
        text="next anecdote"
        changeValue={() =>
          setSelected(Math.floor(Math.random() * props.anecdotes.length))
        }
      />
      </div>
      <div>
            <h2>Anecdote with most votes</h2>
            <p><i>"{props.anecdotes[mostVotes]}</i>" <br/> has {point[mostVotes]} votes</p>
      </div>
    </div>
    
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
