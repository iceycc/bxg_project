var child_process = require('child_process');
var path = require('path');

// mian里面去创建一个子进程 child
var child = child_process.fork(path.resolve(__dirname, './child.js'));  // 稳定性

// fork() 之后会返回一个对象，用于通信

child.on('message', (data) => {  // main去监听child的消息
    console.log('父亲接收到数据', data);
})

child.send('儿子，爸爸给你发消息了');
