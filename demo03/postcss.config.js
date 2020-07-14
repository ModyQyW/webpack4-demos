module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' && require('cssnano'),
  ],
};
