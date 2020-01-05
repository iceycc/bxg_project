'use strict';
// import HttpController from './base/http';
// const Controller = require('egg').Controller;
var HttpController = require('./base/http.js');

class CsrfController extends HttpController {
  async index() {
    const { ctx } = this;
    ctx.body='<script>alert("访问你的淘宝支付链接")</script>'  // response实际上是字符串
  }
}

module.exports = CsrfController;
