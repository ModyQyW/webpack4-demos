// use path module
const path = require('path');
// require plugins
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
  // mode
  mode: 'production',
  // entry ${PROJECT_DIR}/src/index.js
  entry: path.resolve('src', 'index.js'),
  // output ${PROJECT_DIR}/dist/index.js
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  // plugins
  plugins: [
    // show bar
    new WebpackBar(),
    // clean output
    new CleanPlugin(),
    // copy ${PROJECT_DIR}/public/favicon.ico
    new CopyPlugin({
      patterns: [{ from: path.resolve('public', 'favicon.ico') }],
    }),
    // use ${PROJECT_DIR}/public/index.html as template
    new HtmlPlugin({
      title: 'demo02',
      template: path.resolve('public', 'index.html'),
    }),
  ],
  // loaders
  module: {
    rules: [
      {
        // js and jsx files
        test: /\.jsx?$/,
        // exclude node_modules and bower_components
        exclude: /(node_modules|bower_components)/,
        // deal with babel-loader
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // css files
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#2f54eb',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
