const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode:"development",
  entry: "./src/main.js",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
        }
      }
    ]
  },
  devServer:{
    open:true
  },
  plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
          template:'./template.html'
      })
    ]
};
