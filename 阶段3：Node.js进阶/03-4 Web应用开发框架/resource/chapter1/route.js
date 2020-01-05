var koa = require('koa');
var app = new koa();
var route = require('koa-route');


const main = (ctx) => {
    console.log()
    ctx.response.body = 'hello world';
}

const qita = (ctx) => {
    console.log()
    ctx.response.body = 'qita';
}

app.use(route.get('/', main));  //  1. 路径 2. ctx函数
app.use(route.get('/qita', qita));
app.listen(3000);  // 起服务 ， 监听3000端口