// use path module
const path = require('path');
// require plugins
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  // entry ${PROJECT_DIR}/src/index.js
  entry: path.resolve('src', 'index.js'),
  // output ${PROJECT_DIR}/dist/index.js
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  // plugins
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
        use: [{ loader: 'babel-loader' }],
      },
      {
        // css files
        test: /\.css$/,
        // deal with css-loader first, then style-loader
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        // less files
        test: /\.less$/,
        // deal with less-loader first, then css-loader, finally style-loader
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // customize theme
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
        // sass/scss files
        test: /\.s[ac]ss$/,
        // deal with sass-loader first, then css-loader, finally style-loader
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      },
      {
        // image files
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        // deal with url-loader
        use: [
          {
            loader: 'url-loader',
            options: {
              // 10 MB max
              limit: 10240,
            },
          },
        ],
      },
      {
        // font files
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // deal with url-loader
        use: [{ loader: 'url-loader' }],
      },
      {
        // audio and video files
        test: /\.(mp3|mp4|webp|webm|flv)$/,
        // deal with url-loader
        use: [{ loader: 'url-loader' }],
      }
    ],
  },
};
