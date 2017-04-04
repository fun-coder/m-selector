"use strict";

const path = require('path');

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, '..', 'web-demo', 'index.js'),

  output: {
    path: path.join(__dirname, '..', 'web-demo'),
    filename: "index.bundle.js"
  },

  devtool: "#inline-source-map",

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: 'babel-loader'
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  },

  devServer: {
    contentBase: "./web-demo",
  }
};