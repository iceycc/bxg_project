const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: {
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
    chunkFilename:"js/[name]-[hash:8].js"
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
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true //抽取出去之后，压缩css
              }
            }
          ]
        })
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
    // 设置为生产环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    // 压缩js
    new webpack.optimize.UglifyJsPlugin({
      //压缩bundle.js
      compress: {
        warnings: false,
        drop_debugger: true, //去除调试
        drop_console: true //去除console
      },
      output: {
        comments: false //去除copyright
      }
    }),
     //抽离第三方包的，这里不要写bundle.js
     new webpack.optimize.CommonsChunkPlugin({
      name: [
        "quanjiatong",
        "vue-lazyload",
        "v-distpicker",
        "moment",
        "jquery",
        "axios"
      ],
      // name: ['jquery', 'vue-moment','quanjiatong','axios','v-distpicker','vue-lazyload'],
      // filename: "vendor.js"
      // (给 chunk 一个不同的名字)
      minChunks: Infinity
      // (随着 entry chunk 越来越多，
      // 这个配置保证没其它的模块会打包进 vendor chunk)
    }),
    new ExtractTextPlugin("css/styles.css"),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
