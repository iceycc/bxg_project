// electron项目的入口文件
// 开启一个应用，需要引入app
const {app,BrowserWindow}  = require('electron')

// 当我们启动main.js文件的时候，会自动的触发app的ready事件
app.on('ready',function(){
    // 这个事件中，一般进行当前应用的窗口的创建
    hm_createWindow()
})

// 通过一个函数来创建应用的窗口
function hm_createWindow(){
    let win = new BrowserWindow({
        // 宽度
        width:300,
        // 高度
        height:560,
        // 标题
        title:'黑马计算器'
        // 背景色
    })
}