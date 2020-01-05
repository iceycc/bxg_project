const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: "./src/main.js", //入口
  output: {
    //出口
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    // webpack3.x之后，替代loaders
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template:'./template.html', //参照文件目录
      filename:'index.html' // 打包之后生成的页面的名称
    })
  ]
};
