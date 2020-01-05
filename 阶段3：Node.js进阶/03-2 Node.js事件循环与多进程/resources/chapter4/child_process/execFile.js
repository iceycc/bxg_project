const { execFile } = require('child_process');
// 1. shell 2. args: arr 3. cb
execFile('ls', ['-c'], (err, stdout, stderr) => {  // execFile会自动过滤一些敏感的 字符串 比如'\ ;'
    console.log('stdout', stdout)
})
