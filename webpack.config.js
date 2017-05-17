'use strict';
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'release'),
    filename: 'js/[name].js',
    publicPath: '//localhost:3000/static/'
  },
  entry: {
    'successRate': ['./js/page/successRate']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(?:jade|pug)$/,
        loader: 'pug-loader'
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './jade/index.jade',
      inject: true,
      chunks: ['successRate']
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
};
