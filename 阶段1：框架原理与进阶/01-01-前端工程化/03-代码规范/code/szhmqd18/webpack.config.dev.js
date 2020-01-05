const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const path = require("path");

module.exports = {
  //入口
  entry: "./src/main.js",
  //loader
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        options: {
          // eslint options (if necessary)
        }
      }
    ]
  },
  devServer: {
    overlay: true
  },
  //plugins
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html"
    }),
    new StyleLintPlugin({
      context: "src",
      configFile: path.resolve(__dirname, "stylelint.config.js"),
      files: "css/*.*",
      failOnError: false,
      quiet: true,
      fix: true
      // syntax: "less"
    })
  ]
};
