const cluster = require('cluster');  // nodejs内置模块
const http = require('http');
const cpuMuns = require('os').cpus().length;  // cpu核数

//cluser 基本原理， 就是主线程去fork 子线程，然后管理他们

if (cluster.isMaster) {  // 如果你是主线程
    // cluster.fork();
    for(var i = 0; i < cpuMuns; i++) {
        cluster.fork();  // 开启子进程
    }
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {  //子线程走下面

    http.createServer((req, res) => {
        res.end('hello');
    }).listen(8001, () => {
      console.log('server is listening: ' + 8001);
    });
}