'use strict';

const Controller = require('egg').Controller;
// 如果成功 
// {
//     msg: 'success',
//     code: 0,
//     data: [1, 2, 3, 4]
// }

// 失败
// {
//     msg: '错误信息',
//     code: 999, // 只要不是0
//     data: {
//         //xxx
//     }
// }


class HttpController extends Controller {
  async success(data) {

    // msg 和 code这样的2个字段 在所有的请求里面都需要返回。
    // 好好理解oop
    this.ctx.body = {
        msg: data && data.msg || 'ok',
        code: 0,
        data
    }
  }

  async fail(data) {  // data代表错误信息
    this.logger.error(data); // 错误信息存入日志
    this.ctx.body = {
        msg: data && data.msg || 'fail',
        code: data && data.code || 1,  // 只要不是0就是失败
        data,  // 可以兼容对象和字符串
    }
  }
}

module.exports = HttpController;
