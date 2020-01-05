const net = require('net');  // 是最基础的网络模块，http的基础就是net
const fork = require('child_process').fork;

var handle = net._createServerHandle('0.0.0.0', 3000);

for (var i = 0; i < 4; i ++) {
    console.log('fork', i);
    fork('./worker').send({}, handle);
}