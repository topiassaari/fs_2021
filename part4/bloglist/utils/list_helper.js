var _ = require("lodash");

const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (s, i) => {
    return s + i.likes;
  };
  return blogs.likes === 0 ? 0 : blogs.reduce(reducer, 0);
};
const favoriteBlog = (blogs) => {
  const reducer = (s, i) => {
    return Math.max(s, i.likes);
  };
  const mostLikes = blogs.reduce(reducer, 0);

  return mostLikes === 0
    ? "no favorites found"
    : blogs.find((a) => a.likes === mostLikes);
};
const mostBlogs = (blogs) => {
  var names = _.map(blogs, "author");
  var mostAuthor = _.chain(names).countBy().toPairs().max(_.last).value();
  console.log(mostAuthor);
  return { author: mostAuthor[0], blogs: mostAuthor[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
