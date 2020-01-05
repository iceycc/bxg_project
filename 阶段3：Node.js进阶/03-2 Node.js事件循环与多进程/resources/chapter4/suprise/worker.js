const net = require('net');
process.on('message', function(m, handle) {
  start(handle);
});

var buf = 'hello nodejs';
var res = ['HTTP/1.1 200 OK','content-length:'+buf.length].join('\r\n')+'\r\n\r\n'+buf;

var data = {};

function start(server) {
    server.listen();
    server.onconnection = function(err,handle) {
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
}