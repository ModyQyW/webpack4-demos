const path = require('path');
const os = require('os');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve('dist'),
    filename: 'js/[name].[chunkhash:8].js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'stat',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css',
            },
          },
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
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css',
            },
          },
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
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: os.cpus().length - 1,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        zent: {
          name: 'chunk-zent',
          priority: 30,
          test: /[\\/]node_modules[\\/]_?zent(.*)/,
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 20,
          chunks: 'initial',
        },
        components: {
          name: 'chunk-components',
          test: path.resolve('src', 'components'),
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
      },
    },
  },
  stats: 'minimal',
});
