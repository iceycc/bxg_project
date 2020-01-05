'use strict';
// import HttpController from './base/http';
// const Controller = require('egg').Controller;
var HttpController = require('./base/http.js');

function handleData() {
   // 处理数据
   console.log('正在处理数据');
   xxxxxx();
};

class HomeController extends HttpController {
  async index() {
    const { ctx } = this;
    // console.log('---------',ctx.pluginA) // 打印的很随意 debug
    
    // console.log('--------------',ctx.queries);
    // console.log('csrf', ctx.csrf)

    // ctx.logger.info('-----------  ctx中的info');
    // ctx.logger.debug('-----------  ctx中的debug');
    // ctx.logger.warn('-----------  ctx中的warn');
    // ctx.logger.error('-----------  ctx中的error');
    
    // handleData();

    // try {
    //   // 业务逻辑
    //   // try 只能捕捉到当前的这一轮执行

    //   //runInBackground 
    //   // setImmediate(() => {  // 希望你在后台运行
    //   //   fancuowu();
    //   // })
    //   throw('我是错误') // 一定要抛出Error对象
    //   // ctx.runInBackground(async () => {
    //   //   fancuowu()
    //   // });

    // } catch(err) {
    //   // 错误处理
    //   // logger.error()
    //   console.info(err)
    // }
    // fancuowu();  // 裸奔
    ctx.status = 200;
    // await this.success({
    //   user_id: '23132312312312312'
    // })
  }

  // 1. 需要在 controller定义怎么渲染
  async hello() {
    const { ctx } = this;
    await ctx.render('hello.nj'); // 自动的读取view/hello.nj
  }

  async addUser() {
    const { ctx } = this;
    console.log('=========',ctx.request.body);
    // console.log(ctx.csrf)
    ctx.body = 'success';
  }

  async redirect() {
    const { ctx } = this;
    ctx.redirect('https://baidu.com');
  }

  async getdata() {
    const { ctx } = this;
    console.log('-------------')
    var data = await this.service.data.index();
    ctx.body = '兄弟你404了！！！！';   // 可以去通过render模板，写了个优美的404页面
  }
}

module.exports = HomeController;
