var koa = require('koa');
var app = new koa();
var fs = require('fs');
var path = require('path');
// 1.  使用nodejs读取html文件
// 2. response把读取的内容返回给客户端

const main = (ctx) => {  // koa提供的context对象
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(path.resolve(path.join(__dirname, './demo.html')));  // 一定要区别路径，好好体会一下！！！！！
}

app.use(main);  //  接收一个函数
app.listen(3000);  // 起服务 ， 监听3000端口