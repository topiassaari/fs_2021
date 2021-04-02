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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
