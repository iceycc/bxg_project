let btn1 = document.querySelector('#one')

// 一些模块或成员只能在主进程中使用，如果在渲染进程中你想使用，那么就必须通过remote模块来实现
const remote = require('electron').remote

btn1.onclick = () => {
    console.log('btn1')
    // 打印出主进程中创建的共享对象的数据
    console.log(remote.getGlobal('shardData'))
    remote.getGlobal('shardData').name = 'heima 计算器'
    console.log(remote.getGlobal('shardData'))
}