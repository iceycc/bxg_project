// var koa = require('koa');
// var app = new koa();
// var route = require('koa-route');
// var koaBody = require('koa-body');

// // koa-body  
// // 1. 看一下koa怎么处里post的参数   taobao.com?name=xiaoming&age=18
// // 2.目的： 解析body参数   post传递过来的属性其实是二进制
// // 需要使用模拟请求的工具 postman
// const main = (ctx) => {
//     // var dataArr =[];
//     // 客户端发送post的数据，会触发 data事件
//     // var dataArr = [];
//     // // 需要使用数组去存储然后合并
//     // ctx.req.addListener('data', (data) => {  // 和on类似
//     //     console.log(data);
//     //     dataArr.push(data);
//     // });

//     // ctx.req.addListener('end', () => {
//     //     let data = Buffer.concat(dataArr).toString();
//     //     console.log(data);
//     // })

//     // console
//     var body = JSON.stringify(ctx.request);
//     console.log(body)
    
// }

// // app.use(koaBody);
// app.use(route.post('/', koaBody(), main));  //  1. 路径 2. ctx函数
// app.listen(3000);  // 起服务 ， 监听3000端口

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();   // 注意： 不是koa-route！！！！
const koaBody = require('koa-body');

router.post('/', koaBody(),
  (ctx) => {
    console.log(ctx.request.body);
    // => POST body
    ctx.body = JSON.stringify(ctx.request.body);
  }
);

app.use(router.routes());

app.listen(3000);