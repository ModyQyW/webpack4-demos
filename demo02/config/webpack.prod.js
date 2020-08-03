const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'cheap-source-map',
  plugins: [
    // analyze bundle
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'stat',
      openAnalyzer: false,
    }),
  ],
});
