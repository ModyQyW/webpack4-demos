const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    noInfo: true,
  },
  devtool: 'eval-cheap-source-map',
});
