module.exports = config => {
  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/images');

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
