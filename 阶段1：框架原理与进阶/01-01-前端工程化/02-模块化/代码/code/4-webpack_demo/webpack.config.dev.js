const path = require("path");
const webpack = require('webpack')

module.exports = {
  mode: "development",
  entry: "./src/entry.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename:'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by 段子黄')
  ]
};
