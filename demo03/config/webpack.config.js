const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');

module.exports = (env, argv) => {
  const mode = argv.mode || 'production';

  const envConfig = {};
  let tmpEnvConfig = {};
  let envFilePath = path.resolve('.env');
  if (fs.existsSync(envFilePath)) {
    tmpEnvConfig = dotenv.parse(fs.readFileSync(envFilePath));
    const keys = Object.keys(tmpEnvConfig);
    keys.forEach((k) => {
      envConfig[k] = tmpEnvConfig[k];
    });
  }
  envFilePath = path.resolve('.env.local');
  if (fs.existsSync(envFilePath)) {
    tmpEnvConfig = dotenv.parse(fs.readFileSync(envFilePath));
    const keys = Object.keys(tmpEnvConfig);
    keys.forEach((k) => {
      envConfig[k] = tmpEnvConfig[k];
    });
  }
  envFilePath = path.resolve(`.env.${mode}`);
  if (fs.existsSync(envFilePath)) {
    tmpEnvConfig = dotenv.parse(fs.readFileSync(envFilePath));
    const keys = Object.keys(tmpEnvConfig);
    keys.forEach((k) => {
      envConfig[k] = tmpEnvConfig[k];
    });
  }
  envFilePath = path.resolve(`.env.${mode}.local`);
  if (fs.existsSync(envFilePath)) {
    tmpEnvConfig = dotenv.parse(fs.readFileSync(envFilePath));
    const keys = Object.keys(tmpEnvConfig);
    keys.forEach((k) => {
      envConfig[k] = tmpEnvConfig[k];
    });
  }
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
