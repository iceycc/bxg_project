var koa = require('koa');
var app = new koa();
var static = require('koa-static');

var path = require('path');

app.use(static(
    path.join(__dirname, './img')
));
app.listen(3000);  // 起服务 ， 监听3000端口