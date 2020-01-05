var koa = require('koa');
var app = new koa();
var route = require('koa-route');
var fs = require('fs');
var path = require('path');

const main = (ctx) => {
    ctx.response.body = 'hello world';
}

// 目的： 读取图片
// 思路： 
// 1. 通过 fs读取图片
// 2. response返回图片，修改type
const meinv = (ctx) => {
    ctx.response.type = 'jpeg';
    ctx.response.body = fs.readFileSync(path.resolve(path.join(__dirname, './img/meinv.jpeg')));
}

app.use(route.get('/', main));  //  1. 路径 2. ctx函数
app.use(route.get('/meinv', meinv));
app.use(route.get('/meinv2', meinv2));
app.listen(3000);  // 起服务 ， 监听3000端口