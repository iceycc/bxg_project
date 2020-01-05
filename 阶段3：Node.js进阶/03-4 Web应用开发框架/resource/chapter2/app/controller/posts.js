'use strict';

const Controller = require('egg').Controller;

class PostsController extends Controller {
  async show() {
    const { ctx } = this;
    console.log('show =============');
    console.log(ctx.query)
    ctx.body = 'xxxxxxxxxxx'; // ctx 来自koa
  }

  async index() {
    const { ctx } = this;
    console.log('post index')
    ctx.body = 'xxxxxxxxx'; // ctx 来自koa
  }
}

module.exports = PostsController;
