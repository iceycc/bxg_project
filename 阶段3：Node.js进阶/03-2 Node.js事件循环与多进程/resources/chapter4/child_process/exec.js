var exec  = require('child_process').exec;

// 回调
// exec('ls', (err, stdout, stderr) => {
//     if (err) { // 错误处理和 业务代码一样重要
//         console.log('stderr', stderr)
//     } 
//     console.log('stdout', stdout)
// })

//  通过流的方式去接收结果，类似文件读取，
// rm -rf 删除
var path = '../ \ rm -rf';
var child = exec(`ls -c ${path}`);
child.stdout.on('data', (data) => {
    console.log('data', data)
});

child.stderr.on('data', (err) => {
    // 打印err
})

console.log('11111');