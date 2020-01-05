// module.exports = {
//   webpack: config => {
//     // Fixes npm packages that depend on `fs` module
//     config.node = {
//       fs: 'empty'
//     }

//     return config
//   }
// }

const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

module.exports = withCSS(withLess({
  // 打开css和less的模块化导入
  cssModules:true
}));