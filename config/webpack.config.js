/*
 * The webpack config exports an object that has a valid webpack configuration
 * For each environment name. By default, there are two Ionic environments:
 * "dev" and "prod". As such, the webpack.config.js exports a dictionary object
 * with "keys" for "dev" and "prod", where the value is a valid webpack configuration
 * For details on configuring webpack, see their documentation here
 * https://webpack.js.org/configuration/
 */

var webpack = require('webpack');
var ionicWebpackFactory = require(process.env.IONIC_WEBPACK_FACTORY);

var ModuleConcatPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
var PurifyPlugin = require('@angular-devkit/build-optimizer').PurifyPlugin;

var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

useDefaultConfig.dev.plugins = [
  ionicWebpackFactory.getIonicEnvironmentPlugin(),
  ionicWebpackFactory.getCommonChunksPlugin(),
  new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
    result.request = result.request.replace(/typeorm/, "typeorm/browser");
  }),
  new webpack.ProvidePlugin({
    'window.SQL': 'sql.js/js/sql.js'
  })
]

useDefaultConfig.prod.plugins = [
  ionicWebpackFactory.getIonicEnvironmentPlugin(),
  ionicWebpackFactory.getCommonChunksPlugin(),
  new ModuleConcatPlugin(),
  new PurifyPlugin(),
  new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
    result.request = result.request.replace(/typeorm/, "typeorm/browser");
  })
]

module.exports = function () {
  return useDefaultConfig;
};
