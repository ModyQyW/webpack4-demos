const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    hot: true,
    open: true,
    quiet: true,
  },
  devtool: 'eval-cheap-source-map',
});
