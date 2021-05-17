import React from "react";
const App = () => {
  const courseName = "Half Stack application development";
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }
  interface CoursePartWithRequirements extends CoursePartWithDescription {
    type: "special";
    requirements: Array<string>;
  }
  interface CourseNormalPart extends CoursePartWithDescription {
    type: "normal";
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSubmissionPart extends CoursePartWithDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CoursePartWithRequirements;

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  interface HeaderProps {
    name: string;
  }
  type Contents = {
    name: string;
    exerciseCount: number;
  };

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };
  const Part = ({ content }: { content: CoursePart }) => {
    switch (content.type) {
      case "normal":
        return (
          <div style={{ marginBottom: "8px" }}>
            <span>
              <b>
                {content.name} {content.exerciseCount}
              </b>{" "}
              <br />
              <i>{content.description}</i>
            </span>
          </div>
        );
      case "submission":
        return (
          <div style={{ marginBottom: "8px" }}>
            <span>
              <b>
                {content.name} {content.exerciseCount}
              </b>
              <br />
              <i>{content.description}</i>
              <br />
              <a href={content.exerciseSubmissionLink}>
                {content.exerciseSubmissionLink}
              </a>
            </span>
          </div>
        );
      case "groupProject":
        return (
          <div style={{ marginBottom: "8px" }}>
            <span>
              <b>
                {content.name} {content.exerciseCount}
              </b>
              <br />
              group project count: {content.groupProjectCount}
              <br />
            </span>
          </div>
        );
      case "special":
        return (
          <div style={{ marginBottom: "8px" }}>
            <span>
              <b>
                {content.name} {content.exerciseCount}
              </b>
              <br />
              required skills:{" "}
              {content.requirements.map((r) => {
                return r + ", ";
              })}
              <br />
            </span>
          </div>
        );
      default:
        return null;
    }
  };
  const Content = ({ content }: { content: CoursePart[] }) => {
    return (
      <div>
        {content.map((c) => {
          return <Part key={c.name} content={c} />;
        })}
      </div>
    );
  };
  const Total = ({ content }: { content: Array<Contents> }) => {
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
