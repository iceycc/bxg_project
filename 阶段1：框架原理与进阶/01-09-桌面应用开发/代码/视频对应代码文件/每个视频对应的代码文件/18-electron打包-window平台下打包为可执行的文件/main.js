// electron项目的入口文件
// 开启一个应用，需要引入app
const {app,BrowserWindow,ipcMain}  = require('electron')
var path = require('path')

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
        height:490,
        // 标题
        title:'黑马计算器'
        // 背景色
    })

    // 设置窗口中所加载的页面的内容
    win.loadURL(path.join(__dirname,'views/index.html'))

    // 打开调试工具
    // win.webContents.openDevTools()

    // 添加事件-当窗口关闭的时候触发
    win.on('close',function(event){
        // 将win重置为null
        // win = null
        // 应用程序的退出
        // app.quit()

        // 只是对窗口隐藏
        win.hide()
        // 隐藏任务栏图标,如果参数为true,就会路过任务栏的显示-不在任务栏中显示
        win.setSkipTaskbar(true)
        // 阻止默认行为
        event.preventDefault()
    })

    // 当窗口加载完毕之后，准备显示的时候触发
    win.on('ready-to-show',function(){
        win.show()
        // 将当前窗口激活
        win.focus()
    })
    // 开启开发者工具
    // win.webContents.openDevTools()

    // 引入菜单模块
    require('./mainProcess/menu')
    // 引入系统托盘
    var createTray = require('./mainProcess/tray')
    createTray(win)

    // 通过ipcMain监听渲染进程发送过来的消息
    ipcMain.on('hm_setColor',function (event,color) {
        console.log(color)
        // 从主进程向渲染进程发送消息
        // event.sender.send('hm_setColorToRender',color)
        // 使用win.webContents来实现消息的发送
        win.webContents.send('hm_setColorToRender',color)
    })
}