// 操作数据源
const path = require('path');
const fs = require('fs');

module.exports.getData = () => {
  // 读取文件
  let filePath = path.join(__dirname, 'data.json');
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if(err) {
        // 读取文件失败
        reject('error');
      }
      // 读取文件成功
      resolve(data.toString());
    })
  })
}