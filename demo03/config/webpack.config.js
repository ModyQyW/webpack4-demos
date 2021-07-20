const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';

  const envConfig = {};
  let tmpEnvConfig = {};
  const envFiles = ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`];
  envFiles.forEach((envFile) => {
    const envFilePath = path.resolve(envFile);
    if (fs.existsSync(envFilePath)) {
      tmpEnvConfig = dotenv.parse(fs.readFileSync(envFilePath));
      const keys = Object.keys(tmpEnvConfig);
      keys.forEach((k) => {
        envConfig[k] = tmpEnvConfig[k];
      });
    }
  });
  envConfig.NODE_ENV = envConfig.NODE_ENV || 'production';

  const definePluginOptions = {};
  const keys = Object.keys(envConfig);
  keys.forEach((k) => {
    process.env[k] = envConfig[k];
    const v = JSON.stringify(envConfig[k]);
    definePluginOptions[k] = v;
    definePluginOptions[`process.env.${k}`] = v;
  });
  const plugins = [new webpack.DefinePlugin(definePluginOptions)];

  switch (process.env.NODE_ENV) {
    case 'development':
      return merge(baseConfig, devConfig, {
        plugins,
      });
    default:
      return new SpeedMeasurePlugin().wrap(
        merge(baseConfig, prodConfig, {
          plugins,
        }),
      );
  }
};
