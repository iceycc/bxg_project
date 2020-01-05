// ipcMain:可以用于主进程监听渲染进程发送过来的消息(事件)
const {app,BrowserWindow,ipcMain} = require('electron')

var path = require('path')

// 监听ready事件
app.on('ready',() => {
    hm_createWindow()
})

// 通过函数封装创建窗口的过程
function hm_createWindow(){
    let win = new BrowserWindow({
        width:500,
        height:500,
        title:'进程间的通信'
    })

    // 打开开发者工具
    win.webContents.openDevTools()

    // 加载静态文件
    win.loadURL(path.join(__dirname,'./views/renderProcess.html'))

    // 添加close事件的的监听
    win.on('close',() => {
        win = null
        app.quit()
    })
}

// 监听从渲染进程中发送过来的hm_sendToMain
ipcMain.on('hm_sendToMain',(event,msg) => {
    // 打印出渲染进程发送过来的消息
    // 关于输出结果
    // 1.如果是主进程中console.log那么就会在终端中显示
    // 2.如果是在渲染进程中console.log,那么就会在开发者工具中显示
    console.log(msg)
})
