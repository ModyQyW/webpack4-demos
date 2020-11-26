const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

if (process.env.NODE_ENV === 'development') {
  module.exports = merge(baseConfig, devConfig);
} else {
  module.exports = merge(baseConfig, prodConfig);
}
