// use path module
const path = require('path');
// require plugins
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  // entry
  entry: {
    app: path.resolve('src', 'index.js'),
  },
  // output
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
  },
  // plugins
  plugins: [
    // show friendly errors
    new FriendlyErrorsPlugin(),
    // clean output
    new CleanPlugin(),
    // copy ${PROJECT_DIR}/public/favicon.ico
    new CopyPlugin({
      patterns: [{ from: path.resolve('public', 'favicon.ico') }],
    }),
    // use ${PROJECT_DIR}/public/index.html
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
        // exclude node_modules
        exclude: /node_modules/,
        // deal with babel-loader
        use: [{ loader: 'babel-loader' }],
      },
      {
        // css files
        test: /\.css$/,
        // deal with css-loader first, then style-loader
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        // sass/scss files
        test: /\.s[ac]ss$/,
        // deal with sass-loader first, then css-loader, finally style-loader
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          { loader: 'resolve-url-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        // image files
        test: /\.(png|jpg|jpeg|gif)$/,
        // deal with url-loader
        use: [
          {
            loader: 'url-loader',
            options: {
              // 8 MB max
              limit: 8192,
              // put into img folder
              outputPath: 'img',
              // specify img folder
              publicPath: 'img',
            },
          },
        ],
      },
      {
        // font files
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // deal with url-loader
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: 'fonts',
              publicPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
};
