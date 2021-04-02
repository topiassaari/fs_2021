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

module.exports = {
  dummy,
  totalLikes,
};
