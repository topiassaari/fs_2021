import React from "react";

const Header = (props) => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};
const Content = (props) => {
  const courses = props.parts;
  const total = props.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  
  return (
    <div>
      {courses.map((c) => {
      console.log(c);
      return(
            <Part
              part={c.name}
              exercise={c.exercises}
            />)
          })}
            <b>Total exercises: {total}</b>
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
    </div>
  );
};

export default Course;


