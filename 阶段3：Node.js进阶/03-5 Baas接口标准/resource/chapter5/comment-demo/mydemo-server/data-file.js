// 操作数据源
const path = require('path');
const fs = require('fs');
// 读取文件数据
let getData = () => {
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
// 向文件写入数据
let setData = async (username, content) => {
  let filePath = path.join(__dirname, 'data.json');
  let file = await getData();
  let arr = JSON.parse(file);
  // 添加新的留言数据
  arr.unshift({
    username: username,
    content: content,
    date: new Date().getTime()
  });
  return new Promise((resolve, reject) => {
    // 将添加完成的数据重新写入文件
    let str = JSON.stringify(arr);
    fs.writeFile(filePath, str, 'utf-8', () => {
      resolve('success');
    })
  })
}

module.exports.getData = getData;
module.exports.setData = setData;
