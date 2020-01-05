var koa = require('koa');
var app = new koa();

const main = (ctx) => {  // koa提供的context对象
    // ctx.status = 200;
    ctx.response.body = 'hello world'; // 为什么 修改body之后 status就变为了200.  通过set劫持，只要修改了body就会自动把status改为200.
}

app.use(main);  //  接收一个函数
app.listen(3000);  // 起服务 ， 监听3000端口