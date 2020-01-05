const os = require('os');
const path = require('path');
const koaBody = require('koa-body');
var route = require('koa-route');
var koa = require('koa');
var app = new koa();
var fs = require('fs');

const main = async function(ctx) {
  const tmpdir = os.tmpdir();  //  创建一个系统的临时目录， 这是我们自己所指定的目录
  const filePaths = [];  // 最终生成的文件地址'usr/work/files'
  const files = ctx.request.files || {};  // !!!!  koa-body会自动处里并且挂载到它自己定义的一个目录

  for (let key in files) { // 文件是分段传输的
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);   // 生成我们自己指定的目录
    const reader = fs.createReadStream(file.path);   // 读取文件，并且把它存在一个变量中
    const writer = fs.createWriteStream(filePath);  //  定义写入函数，写入到我们指定的目录
    reader.pipe(writer);  // 真正的去执行读写的过程
    filePaths.push(filePath);
  }
//   console.log('xxxxxxxx', filePaths)
  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));  // 代表我们上传的是文件,可以上传多个文件
app.use(route.post('/upload', main));
app.listen(3000);  // 起服务 ， 监听3000端口