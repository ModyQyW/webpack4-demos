// use path module
const path = require("path");
// require plugins
const { CleanWebpackPlugin: CleanPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const WebpackBar = require('webpackbar');

module.exports = {
  // mode
  mode: "production",
  // entry
  entry: path.resolve(__dirname, "src", "index.js"),
  // output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // plugins
  plugins: [
    // show bar
    new WebpackBar(),
    // clean output
    new CleanPlugin(),
    // copy ./public/favicon.ico
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "public", "favicon.ico") }],
    }),
    // use ./public/index.html as template
    new HtmlPlugin({
      title: "demo01",
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
