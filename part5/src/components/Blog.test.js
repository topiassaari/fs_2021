import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    author: "jab",
    title: "dab",
    url: "dub.com",
    likes: 2,
    user: { username: "dibb" },
  };

  const component = render(
    <Blog className="blog" username="dibb" blog={blog} />
  );
  console.log();
  expect(component.container.querySelector(".smallContent")).toHaveStyle(
    "display: block"
  );
  expect(component.container.querySelector(".fullContent")).toHaveStyle(
    "display: none"
  );
});
