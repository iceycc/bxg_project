
// 引入ipcRenderer
const {ipcRenderer} = require('electron')

var tomain = document.getElementById('tomain')

// 单击按钮的时候，从渲染进程发送消息给主进程
tomain.onclick = () => {
    // 通过ipcRenderer向主进程发送消息
    // ipcRenderer.send(事件名称|频道,发送的数据|消息)
    ipcRenderer.send('hm_sendToMain','itcast welcome you')
} 

// 渲染进程监听主进程发送的消息
ipcRenderer.on('hm_sendToRender',(event,msg) => {
    console.log(msg)
})

// 再次监听主进程发送过来的消息
ipcRenderer.on('hm_sendToRender2',(event,msg) => {
    console.log(msg)
})


// 单击按钮我们需要弹出一个新窗口
var newwindow = document.querySelector('#newwindow')
// BrowserWindow:默认只能在主进程中使用，如果你想在渲染进程中使用，就需要使用remote
const {BrowserWindow} = require('electron').remote 

newwindow.onclick = () => {
    let win = new BrowserWindow({
        width:300,
        height:300
    })
}