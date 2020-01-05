var koa = require('koa');
var app = new koa();
var route = require('koa-route');

// 中间件  -  日志 中间件
// 中间件的核心其实是  koa在use里面注入的 next方法
 
var logger = (ctx, next) => {
    
    next();
    console.log(` 中间件执行--- 方法： ${ctx.request.method} 路径： ${ctx.request.path}`);
}

const main = (ctx, next) => {
    // console.log(`方法： ${ctx.request.method} 路径： ${ctx.request.path}`);
    
    ctx.response.body = 'hello world';
    next();
    console.log('main')
}

const qita = (ctx, next) => {
    // console.log(`方法： ${ctx.request.method} 路径： ${ctx.request.path}`);
    ctx.response.body = 'qita';
    next();
}

app.use(logger);
app.use(route.get('/', main));  //  1. 路径 2. ctx函数
app.use(route.get('/qita', qita));
app.listen(3000);  // 起服务 ， 监听3000端口