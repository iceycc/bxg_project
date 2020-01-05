
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