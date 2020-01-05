const net = require('net');
process.on('message', function (m, handle) {
  start(handle);
});

var buf = 'hello Node.js';
var res = ['HTTP/1.1 200 OK','content-length:'+buf.length].join('\r\n')+'\r\n\r\n'+buf;
var data = {};

function start(handle) {
    var pid = process.pid;
    if (!data[pid]) {
        data[pid] = 0;
    }
    data[pid] ++;
    console.log('got a connection on worker, pid = %d', process.pid, data[pid]);
    var socket = new net.Socket({
        handle: handle
    });
    socket.readable = socket.writable = true;
    socket.end(res);
}