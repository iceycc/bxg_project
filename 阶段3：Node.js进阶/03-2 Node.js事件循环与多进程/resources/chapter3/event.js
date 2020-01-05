var EventEmitter = require('events').EventEmitter;

class App extends EventEmitter {
    
}

var app = new App();

app.on('start', () => {  // on 订阅 
    console.log('start');
});

app.emit('start');  // emit 触发
console.log('111111111111')  // emit是同步的方法。

// 为什么是同步的？  setTimeout , setImmedate, nextTick