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
        // js/jsx files
        test: /\.jsx?$/,
        // include src
        include: /src/,
        // deal with babel-loader
        use: [{ loader: 'babel-loader' }],
      },
      {
        // css files
        test: /\.css$/,
        // deal with postcss-loader, css-loader, style-loader
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        // sass/scss files
        test: /\.s[ac]ss$/,
        // deal with sass-loader, resolve-url-loader, postcss-loader,
        //           css-loader, style-loader
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          { loader: 'postcss-loader' },
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
              // 2 MB max
              limit: 2097152,
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
              limit: 2097152,
              outputPath: 'fonts',
              publicPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  // resolve
  resolve: {
    // no need to write .js, .jsx, .ts and .tsx
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
