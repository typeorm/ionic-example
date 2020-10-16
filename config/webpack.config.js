/*
 * The webpack config exports an object that has a valid webpack configuration
 * For each environment name. By default, there are two Ionic environments:
 * "dev" and "prod". As such, the webpack.config.js exports a dictionary object
 * with "keys" for "dev" and "prod", where the value is a valid webpack configuration
 * For details on configuring webpack, see their documentation here
 * https://webpack.js.org/configuration/
 */

var webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');

var useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

useDefaultConfig.dev.plugins.push(
  new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
    result.request = result.request.replace(/typeorm/, "typeorm/browser");
  }),
  new webpack.ProvidePlugin({
    'window.SQL': 'sql.js/dist/sql-wasm-debug.js'
  }),
  new CopyPlugin([ { from: 'node_modules/sql.js/dist/sql-wasm-debug.wasm', to: "../sql-wasm-debug.wasm" } ]),
);

useDefaultConfig.dev.plugins.push(
  new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
    result.request = result.request.replace(/typeorm/, "typeorm/browser");
  }),
  new webpack.ProvidePlugin({
    'window.SQL': 'sql.js/dist/sql-wasm.js'
  }),
  new CopyPlugin([ { from: 'node_modules/sql.js/dist/sql-wasm.wasm', to: "../sql-wasm.wasm" } ]),
);

module.exports = function () {
  return useDefaultConfig;
};
