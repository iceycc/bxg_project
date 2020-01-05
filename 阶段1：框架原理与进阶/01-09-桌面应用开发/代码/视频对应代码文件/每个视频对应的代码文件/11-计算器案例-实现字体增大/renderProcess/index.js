// 引入ipcRenderer
const {ipcRenderer} = require('electron')

// 获取展示结果文本框
var resultText = document.querySelector('.result-text')
// 加载用户偏好设置
resultText.style.color = localStorage.getItem('sysFontColor')
resultText.style.fontSize = localStorage.getItem('sysFontSize') + 'px'

// 设置颜色：监听从主进程发送过来的消息
ipcRenderer.on('hm_setColorToRender',(event,color) => {
    // 设置文本框的颜色样式
    resultText.style.color = color
    // 实现颜色的本地存在 
    localStorage.setItem('sysFontColor',color)
})

// 增加字体
ipcRenderer.on('add',() => {
    // 1.获取原始文本的字体大小  **px
    var fontsize = window.getComputedStyle(resultText,null).fontSize
    // 2.修改字体大小
    var newfontsize = fontsize.replace('px','') - 0 + 3
    if(newfontsize >= 80){
        return
    }
    // 3.重置字体大小
    resultText.style.fontSize = newfontsize + 'px'
    // 4.将字体大小实现本地存储
    localStorage.setItem('sysFontSize',newfontsize)
})
