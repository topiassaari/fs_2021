import React from "react";
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  interface HeaderProps {
    name: string;
  }
  type Content = {
    name: string;
    exerciseCount: number;
  };

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };
  const Content = ({ content }: { content: Array<Content> }) => {
    return (
      <div>
        {content.map((c) => {
          return (
            <p key={c.name}>
              {c.name} {c.exerciseCount}
            </p>
          );
        })}
      </div>
    );
  };
  const Total = ({ content }: { content: Array<Content> }) => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {content.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total content={courseParts} />
    </div>
  );
};

export default App;
