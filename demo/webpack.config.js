const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:4000',
    './demo/index.js'
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '',
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [ 'babel-loader' ],
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __BW_REACT_AUTH_DOMAIN__: process.env.BW_REACT_AUTH_DOMAIN,
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 4000,
    contentBase: 'demo'
  },
};
