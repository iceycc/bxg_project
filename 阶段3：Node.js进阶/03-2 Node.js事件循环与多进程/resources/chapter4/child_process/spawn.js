const { spawn } = require('child_process');

var child = spawn('ls', ['-c']);

child.stdout.on('data', function(data) {  // spawn的data输出的是buffer对象
    // console.log('data', data.toString('utf8'))
    // console.log('data', data.toString('utf8'));
    console.log('data', data.toString('utf8'));

});
child.on('close',function(code) {
    console.log('closing code: ' + code);
  });

// console.log('11111111111111');
