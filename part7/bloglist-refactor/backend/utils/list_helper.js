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
  const mostLiked = blogs.find((a) => a.likes === mostLikes);
  return mostLikes === 0
    ? "no favorites found"
    : {
      title: mostLiked.title,
      author: mostLiked.author,
      likes: mostLiked.likes,
    };
};
const mostBlogs = (blogs) => {
  var names = _.map(blogs, "author");
  var mostAuthor = _.chain(names).countBy().toPairs().max(_.last).value();
  return mostAuthor === undefined
    ? "there are no authors"
    : { author: mostAuthor[0], blogs: mostAuthor[1] };
};
const mostLikes = (blogs) => {
  var liked = _.map(blogs, (a) => {
    return { author: a.author, likes: a.likes };
  });
  var output = _(liked)
    .groupBy("author")
    .map((o, k) => ({
      author: k,
      likes: _.sumBy(o, "likes"),
    }))
    .orderBy("likes")
    .value();
  var mostLiked = _.last(output);
  return mostLiked.likes === 0 ? "there are no likes" : mostLiked;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
