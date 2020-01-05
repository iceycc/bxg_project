const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production", // 生产阶段打包，要设置成production
  entry:  {
    axios: "axios",
    jquery: "jquery",
    moment: "moment",
    "v-distpicker": "v-distpicker",
    "vue-lazyload": "vue-lazyload",
    quanjiatong: ["vue", "vue-router", "vuex"],
    bundle: "./src/main.js" //bundle中打包的是我们自己的源代码
  }, //入口
  output: {
    //出口
    path: path.join(__dirname, "dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[name]-[hash:8].js"
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
        // use: ["style-loader", "css-loader"]
        use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            "css-loader"
          ]
      },
      {
        test: /\.(ttf|woff|eot|svg|jpg|gif|png)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000, //这个相当于阀值，当资源文件大于5kb，从bundle.js中抽离出来
              name: "statics/[name]-[hash:8].[ext]"
            }
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
    new CleanWebpackPlugin("dist"),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./template.html", //参照文件目录
      filename: "index.html", // 打包之后生成的页面的名称
      minify: {
        removeComments: true, //去除注释
        minifyCSS: true, //压缩css
        minifyJS: true, //压缩js
        collapseWhitespace: true //去除空格
      }
    }),
    new webpack.ProvidePlugin({
      //提前导入第三方插件
      $: "jquery",
      jQuery: "jquery"
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "css/[id].css"
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
