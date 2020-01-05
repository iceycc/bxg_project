const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
//打包之前，删除dist目录
var CleanWebpackPlugin = require("clean-webpack-plugin");
//抽离css
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// 压缩抽离出去的css
var cssnano = require("cssnano");

module.exports = {
  entry: {
    react: ["react"],
    "react-dom": ["react-dom"],
    "react-router-dom": ["react-router-dom"],
    "fetch-jsonp": ["fetch-jsonp"],
    bundle: "./src/main.js" // 别忘记我们自己的源代码
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"]
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [cssnano()]
              }
            }
          ],
          publicPath: "/dist/"
        })
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2000, //这个4000代表阀值，这个阀值，在公司中根据需要进行设置
            name: "images/[name]-[hash:5].[ext]" //代表把抽离出去的图片、字体文件从bundle.js中抽离出去之后，放在dist目录下面的statics中
          }
        }
      }
    ]
  },
  resolve: {
    // 解析
    extensions: [".jsx", ".js"]
  },
  plugins: [
    //打包之前，删除dist目录，写在其它插件前面
    new CleanWebpackPlugin("dist"),
    new HtmlWebpackPlugin({
      template: "./template.html",
      minify: {
        removeComments: true, //压缩注释
        minifyJS: true, //压缩js
        minifyCSS: true, //压缩css
        collapseWhitespace: true //去除空格
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false, //去掉警告
        drop_debugger: true,
        drop_console: true //去除console.log
      },
      comments: false //去掉版权信息等注释
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["react", "react-dom", "react-router-dom", "fetch-jsonp"],
      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: Infinity
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
    //把抽离出来的样式文件，放在dist目录下面的css目录下的styles.css中
    new ExtractTextPlugin("css/styles.css")
  ]
};
