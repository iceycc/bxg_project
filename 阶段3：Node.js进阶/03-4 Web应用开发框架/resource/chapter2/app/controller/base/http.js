'use strict';

const Controller = require('egg').Controller;

class HttpController extends Controller {
  async success(data) {

    // msg 和 code这样的2个字段 在所有的请求里面都需要返回。
    // 好好理解oop
    this.ctx.body = {
        msg: 'success',
        code: 0,
        data
    }
  }
}

module.exports = HttpController;
