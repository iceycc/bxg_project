var fs = require('fs');
var path = require('path');

console.time('file');
fs.readFile(path.resolve(__dirname,'/read.txt'), 'utf8', () => {
    console.timeEnd('file');
})