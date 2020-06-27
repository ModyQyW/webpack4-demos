// use path module
const path = require('path');
// require plugins
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  // mode
  mode: 'production',
  // entry
  entry: path.resolve('src', 'index.js'),
  // output
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  // plugin
  plugins: [
    // show friendly errors
    new FriendlyErrorsPlugin(),
    // show bar
    new WebpackBar(),
    // clean output
    new CleanPlugin(),
    // copy ${PROJECT_DIR}/public/favicon.ico
    new CopyPlugin({
      patterns: [{ from: path.resolve('public', 'favicon.ico') }],
    }),
    // use ${PROJECT_DIR}/public/index.html
    new HtmlPlugin({
      title: 'demo01',
      template: path.resolve('public', 'index.html'),
    }),
  ],
};
