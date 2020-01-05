// ipcMain:可以用于主进程监听渲染进程发送过来的消息(事件)
const {app,BrowserWindow,ipcMain} = require('electron')

var path = require('path')

// 监听ready事件
app.on('ready',() => {
    hm_createWindow()
})

// 通过函数封装创建窗口的过程
let win;
function hm_createWindow(){
    win = new BrowserWindow({
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

    // 在使用webContents来主动发送消息的时候，一定要记得添加一个监听事件
    // did-finish-load:如果触发这个事件，说明webContents已经加载完毕
    win.webContents.on('did-finish-load',() => {
        // 主进程 向渲染进程主动发送消息
        win.webContents.send('hm_sendToRender2','在主进程中使用webContents向渲染进程发送的消息')
    })
}

// 监听从渲染进程中发送过来的hm_sendToMain
ipcMain.on('hm_sendToMain',(event,msg) => {
    // 打印出渲染进程发送过来的消息
    // 关于输出结果
    // 1.如果是主进程中console.log那么就会在终端中显示
    // 2.如果是在渲染进程中console.log,那么就会在开发者工具中显示
    console.log(msg)

    // 主进程向渲染进程发送消息
    // event.sender.send(事件名称|频道，发送数据|消息)
    // event.sender.send('hm_sendToRender','这是从主进程向渲染进程发送的消息')
    // 使用window.webContents发送消息
    // win.webContents.send(事件名称|频道，发送数据|消息)
    // win.webContents.send('hm_sendToRender2','在主进程中使用webContents向渲染进程发送的消息')
})

// 设置全局对象，在这个对象中存储不同渲染进程间需要共享的数据
global.shardData = {
    name:'itcast 计算器'
}


