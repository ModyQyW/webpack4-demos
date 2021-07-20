/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve('src', 'index.tsx'),
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new CleanPlugin(),
    new CopyPlugin({
      patterns: [{ from: path.resolve('public', 'favicon.ico') }],
    }),
    new HtmlPlugin({
      title: 'demo03',
      template: path.resolve('public', 'index.html'),
    }),
    new ESLintPlugin({
      files: 'src',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
    new StylelintPlugin({
      files: 'src/**/*.scss',
      fix: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: /src/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(png|jpg|jpeg|git|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2097152,
              outputPath: 'img',
              publicPath: 'img',
              name: '[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2097152,
              outputPath: 'fonts',
              publicPath: 'fonts',
              name: '[name].[contenthash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
