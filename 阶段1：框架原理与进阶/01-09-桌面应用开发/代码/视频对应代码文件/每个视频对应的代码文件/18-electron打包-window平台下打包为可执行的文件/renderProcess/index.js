// 引入ipcRenderer
const {ipcRenderer} = require('electron')
var math = require('mathjs')

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

// 减小字体
ipcRenderer.on('sub',() => {
    // 1.获取当前文本框的字体大小
    var fontsize = window.getComputedStyle(resultText,null).fontSize
    // 2.修改字体大小
    var newfontsize = fontsize.replace('px','') - 0 - 3
    if(newfontsize <= 20){
        return
    }
    // 3.样式重置
    resultText.style.fontSize = newfontsize + 'px'
    // 4.添加本地存储
    localStorage.setItem('sysFontSize',newfontsize)
})

// 默认字体大小
ipcRenderer.on('default',() => {
    resultText.style.fontSize = '50px'
    localStorage.setItem('sysFontSize',50)
})

// 实现计算功能
// 定义一个变量存储用户当前的输入
let result = ''
let main = {
    // 添加一个标记，标记用户是否按下=
    isEqual:false,
    // 添加一个标记，标记用户是否按下运算符
    isOpt:false,
    // 1.实现用户数字的输入
    clickNum(num){
        // 判断用户是否刚刚点击了=
        if(this.isEqual && !this.isOpt){
            result = ''
            resultText.innerHTML = result
            this.isEqual = false
        }
        // 判断用户是否重复输入了点
        let isPoint = num === '.'
        if(result.indexOf('.') !== -1 && isPoint){
            return
        }
        // 将用户的输入依次拼接到result中
        result = result.toString()
        result = result + num
        // 将result值赋值给文本框
        resultText.innerHTML = result
    },
    // 重置用户输入
    reset(){
        resultText.innerHTML = '0'
        result = ''
    },
    // 实现计算功能
    clickopt(opt){
        this.isOpt = true
        switch (opt) {
            case '+/-':
                // result = result * -1
                result = math.eval(result + "*-1")
                resultText.innerHTML = result
                break;
            case '%':
                result = math.format(math.eval(result + "/100"),4)
                resultText.innerHTML = result
                break
            default:
                result = result + opt
                resultText.innerHTML = result
                break;
        }
    },
    // 实现最终的计算功能
    calc(){
        result = math.eval(result).toString()
        resultText.innerHTML = result
        this.isEqual = true
        this.isOpt = false
    }
}

// 单击右键，弹出右键(上下文)菜单
document.oncontextmenu = () => {
    // 渲染进程向主进程发送消息
    ipcRenderer.send('hm_showContextMenu')
}

