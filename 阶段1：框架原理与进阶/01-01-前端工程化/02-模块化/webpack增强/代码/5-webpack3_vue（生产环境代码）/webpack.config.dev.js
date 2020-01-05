const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

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
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ttf|woff|eot|svg|jpg|gif|png)$/,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        // vue-loader 升级到了15.x
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      }
    ]
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src")
    },
    extensions: [".vue", ".js", ".css", "*"]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html", //参照文件目录
      filename: "index.html" // 打包之后生成的页面的名称
    }),
    new webpack.ProvidePlugin({
      //提前导入第三方插件
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};
