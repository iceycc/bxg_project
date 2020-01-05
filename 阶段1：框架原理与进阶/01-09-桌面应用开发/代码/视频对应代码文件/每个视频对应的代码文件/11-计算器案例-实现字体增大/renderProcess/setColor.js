// 引入ipcRenderer
const {ipcRenderer} = require('electron')

// 获取所有颜色span
var spans = document.getElementById('box').querySelectorAll('span')
// 为所有颜色块绑定事件
for(var i=0;i<spans.length;i++){
    spans[i].onclick = function(){
        let color = this.dataset['color']
        // 实现渲染进程向主进程发送数据
        ipcRenderer.send('hm_setColor',color)
    }
}