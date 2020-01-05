var koa = require('koa');
var app = new koa();
var route = require('koa-route');

// 
const errorHandle = async (ctx, next) => {
    try{
        await next();  // next执行报错， 就会进入catch
    } catch(err) {
        console.log('已经捕捉到了错误');  // 错误的日志上传
        ctx.app.emit('error', '发生了错误');
        ctx.response.status = err.statusCode || err.status || 500;  // 对 status的处理
        ctx.response.body = {
            message: err.message   // 默认会带上message属性
        }
    }
};

const main = (ctx) => {
    ctx.throw(500);
}

const home = (ctx) => {}

app.use(errorHandle);
app.use(route.get('/', main));  //  1. 路径 2. ctx函数
// app.use(route.get('/home', home));  //  1. 路径 2. ctx函数
// app.use(errorHandle);  // 如果说没有错误处里中间件，nodejs会帮我们去兜底，但是这样很不好，你没有办法去控制错误

app.on('error', (err) => {   // 如果说，错误提前被catch处里了，那么不会出发error事件
    // 假如需要去做一些统一处理
    console.log('err9999999999999999999', err);
})

app.listen(3000);  // 起服务 ， 监听3000端口