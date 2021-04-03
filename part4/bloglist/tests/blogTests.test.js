const listHelper = require("../utils/list_helper");
const helper = require("../utils/test_helper");

describe("dummy", () => {
  test(" returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});
describe("total likes", () => {
  test("of a list are calculated correctly", () => {
    const result = listHelper.totalLikes(helper.blogs);
    expect(result).toBe(36);
  });
  test("empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe("favorite blog", () => {
  test("of a list is found correctly", () => {
    const result = listHelper.favoriteBlog(helper.blogs);
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
  test("of empty list is zero", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual("no favorites found");
  });
  test("of list with no likes doensn´t return favorites", () => {
    const result = listHelper.favoriteBlog(helper.listWithNoLikes);
    expect(result).toEqual("no favorites found");
  });

  test(" of when list has only one blog, return that", () => {
    const result = listHelper.favoriteBlog(helper.listWithOneBlog);
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
});
describe("most blogs", () => {
  test("of a list is found correctly", () => {
    const result = listHelper.mostBlogs(helper.blogs);
    expect(result).toEqual({ author: "Robert C. Martin", blogs: 3 });
  });
  test(" of when list has only one blog, return that", () => {
    const result = listHelper.mostBlogs(helper.listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });
  test(" of a empty list returns appropriate answer", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toEqual("there are no authors");
  });
});
describe("most likes", () => {
  test("of a list is found correctly", () => {
    const result = listHelper.mostLikes(helper.blogs);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
  });
  test(" of when list has only one blog, return that", () => {
    const result = listHelper.mostLikes(helper.listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
  });
  test(" when no likes, returns appropriate message", () => {
    const result = listHelper.mostLikes(helper.listWithNoLikes);
    expect(result).toEqual("there are no likes");
  });
});
