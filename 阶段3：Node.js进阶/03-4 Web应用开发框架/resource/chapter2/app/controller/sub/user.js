'use strict';
// import HttpController from './base/http';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = '我是sub' // ctx 来自koa
  }
}

module.exports = UserController;
