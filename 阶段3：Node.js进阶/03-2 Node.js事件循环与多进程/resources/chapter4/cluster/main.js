var cluster = require('cluster');
var cpuNums = require('os').cpus().length;
var http = require('http');

if (cluster.isMaster) {
    for (var i = 0;i < cpuNums; i++) {
        cluster.fork('./child.js')
    }

    // 当新的工作进程被fork时，cluster模块将触发'fork'事件。 可以被用来记录工作进程活动，产生一个自定义的timeout。
    // cluster.on('fork', (worker) => {
    //     console.log('主进程fork了一个worker pid为', worker.process.pid);
    // })
    // 当一个工作进程调用listen()后，工作进程上的server会触发'listening' 事件，同时主进程上的 cluster 也会被触发'listening'事件。
    //事件处理器使用两个参数来执行，其中worker包含了工作进程对象， address 包含了以下连接属性： address、 port 和 addressType。当工作进程同时监听多个地址时，这些参数非常有用。

    // cluster.on('listening', (worker) => {
    //     console.log('主进程fork了一个worker进行http服务 pid为', worker.process.pid);
    // })

    // 当cluster主进程接收任意工作进程发送的消息后被触发
    // cluster.on('message', (data) => {
    //     console.log('收到data', data)
    // })
    // var log = cluster;

    // Object.keys(cluster.workers).forEach((id) => {
    //     cluster.workers[id].on('message', function(data) { 
    //         console.log(data)
    //     })
    // });

    cluster.on('disconnect', (worker)=> {
        console.log('有工作进程退出了', worker.process.pid )
        cluster.fork(); // 保证你永远有8个worker
    });
} else {
    // http.createServer((req, res) => {
    //     try{
    //         res.end(aasdasd); // 报错，整个线程挂掉，不能提供服务
    //     } catch(err) {
    //         process.disconnect(); // 断开连接， 断开和master的连接，守护进程其实就是重启
    //     }
    // }).listen(8001, () => {
    //   console.log('server is listening: ' + 8001);
    // });
    // console.log('xxx')
    process.send(process.pid);
    // process.disconnect();
}