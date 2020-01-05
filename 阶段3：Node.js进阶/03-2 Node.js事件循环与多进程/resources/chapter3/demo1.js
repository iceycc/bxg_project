var fs = require('fs');
var path = require('path');

function someAsyncOperation (callback) {
  // 花费2毫秒
  fs.readFile(path.resolve(__dirname, '/read.txt'), callback);
}

var timeoutScheduled = Date.now();
var fileReadTime = 0;

setTimeout(function () {
  var delay = Date.now() - timeoutScheduled;
  console.log('setTimeout: ' + (delay) + "ms have passed since I was scheduled");
  console.log('fileReaderTime',fileReadtime - timeoutScheduled);
}, 10);

someAsyncOperation(function () {
  fileReadtime = Date.now();
  while(Date.now() - fileReadtime < 20) { // 卡住20ms

  }
});

// 关注： setTimeout它的回调执行时机， fs.readFile 回调的执行时间
// 事件循环调度是异步操作，重点关注异步代码的执行时机