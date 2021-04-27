import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
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
  expect(component.container.querySelector(".smallContent")).toHaveStyle(
    "display: block"
  );
  expect(component.container.querySelector(".fullContent")).toHaveStyle(
    "display: none"
  );
});

test("clicking the button displays full info", () => {
  const blog = {
    author: "jab",
    title: "dab",
    url: "dub.com",
    likes: 2,
    user: { username: "dibb" },
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container.querySelector(".fullContent")).toHaveStyle(
    "display: none"
  );

  const button = component.getByText("view");
  fireEvent.click(button);

  expect(component.container.querySelector(".fullContent")).toHaveStyle(
    "display: block"
  );
});
test("clicking the like button twice fires two events", () => {
  const blog = {
    author: "jab",
    title: "dab",
    url: "dub.com",
    likes: 2,
    user: { username: "dibb" },
  };

  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} handleLike={mockHandler} />);

  const likeButton = component.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
