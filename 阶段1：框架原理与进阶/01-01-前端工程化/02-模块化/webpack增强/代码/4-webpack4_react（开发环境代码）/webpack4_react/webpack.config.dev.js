const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode:'development',
    entry:'./src/main.js',
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html'
        })
    ]
}