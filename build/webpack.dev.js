"use strict";

const path = require('path');

module.exports = {
  context: __dirname,
  entry: path.join(__dirname, '..', 'lib', 'm-selector.js'),

  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: "index.js"
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: 'babel-loader'
    }]
  },

  watch: true
};