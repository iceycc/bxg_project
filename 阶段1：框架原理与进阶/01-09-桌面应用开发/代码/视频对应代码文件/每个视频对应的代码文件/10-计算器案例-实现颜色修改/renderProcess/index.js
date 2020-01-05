// 引入ipcRenderer
const {ipcRenderer} = require('electron')

// 获取展示结果文本框
var resultText = document.querySelector('.result-text')
// 加载用户偏好设置
resultText.style.color = localStorage.getItem('sysFontColor')

// 设置颜色：监听从主进程发送过来的消息
ipcRenderer.on('hm_setColorToRender',(event,color) => {
    // 设置文本框的颜色样式
    resultText.style.color = color
    // 实现颜色的本地存在 
    localStorage.setItem('sysFontColor',color)
})