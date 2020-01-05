const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/main.js',
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude: /node_modules/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./template.html'
        })
      ]
}