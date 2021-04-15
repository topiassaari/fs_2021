import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("blog form uploads correctly", () => {
  const mockHandler = jest.fn();

  const component = render(<BlogForm createBlog={mockHandler} />);

  fireEvent.change(component.container.querySelector("#author"), {
    target: { value: "jab" },
  });
  fireEvent.change(component.container.querySelector("#url"), {
    target: { value: "dub.com" },
  });
  fireEvent.change(component.container.querySelector("#title"), {
    target: { value: "dab" },
  });
  fireEvent.submit(component.container.querySelector("form"));

  expect(mockHandler.mock.calls).toHaveLength(1);
  expect(mockHandler.mock.calls[0][0]).toEqual({
    author: "jab",
    url: "dub.com",
    title: "dab",
  });
});
