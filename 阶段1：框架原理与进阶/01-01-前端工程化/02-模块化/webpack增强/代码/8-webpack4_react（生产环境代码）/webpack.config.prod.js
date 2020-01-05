const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    quanjiatong: ["react", "react-dom"],
    "react-router-dom": ["react-router-dom"],
    "fetch-jsonp": ["fetch-jsonp"],
    bundle: "./src/main.js" //bundle.js中打包的就是我们的源代码
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[name]-[hash:8].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"]
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "/dist/"
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 20000, //阀值，当图片大于20kb的时候，就不要打包到bundle.js中
            name: "statics/images/[name]-[hash:8].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    // 解析
    extensions: [".jsx", ".js"]
  },
  //webpack4.x 中要求使用 下面的配置，来替代CommonChunkPlugin
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: "all", //入口文件中的第三方包都抽离
      minSize: 20000, //包的大小最小是20KB
      minChunks: 1, //至少被引用一次
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
      minify: {
        removeComments: true, //压缩注释
        minifyJS: true, //压缩js
        minifyCSS: true, //压缩css
        collapseWhitespace: true //去除空格
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css"
    })
  ]
};
