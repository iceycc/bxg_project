'use strict';

// const Controller = require('egg').Controller;
const HttpController = require('./base/http');
// GET /posts -> app.controller.posts.index
// GET /posts/new -> app.controller.posts.new
// GET /posts/:id -> app.controller.posts.show
// GET /posts/:id/edit -> app.controller.posts.edit
// POST /posts -> app.controller.posts.create     添加数据
// PUT /posts/:id -> app.controller.posts.update
// DELETE /posts/:id -> app.controller.posts.destroy

const createRule = {
  title: 'string',
  content: 'string'
}

// 获取用户通过 HTTP 传递过来的请求参数。
// 校验、组装参数。
// 调用 Service 进行业务处理，必要时处理转换 Service 的返回结果，让它适应用户的需求。
// 通过 HTTP 将结果响应给用户。

class HomeController extends HttpController {
  async create() {
    // 1. 获取post 的参数  2. 写入数据库
    const { ctx } = this;
    

    // 一定错误处理！！！！
    try{
      console.log('==========', ctx.request.body);
      const requestBody = ctx.request.body;
      await ctx.validate(createRule);  //  会自动读取ctx.request.body
      // 写入数据库
      // const postsInstance = new ctx.model.Posts({ // egg会自动改为驼峰
      //   title: requestBody.title,
      //   content: requestBody.content,
      // });
      // const res = await postsInstance.save();  // 接受存储操作的结果
      const res = await ctx.service.posts.create(requestBody);

      await this.success(res);

    } catch(err) {
      await this.fail(err);
    }
  }
  // 查询
  // 查询全部数据
  async index() {
    // get请求
    const { ctx } = this;
    // 1. 查询数据
    try{
      const res = await ctx.service.posts.find({}); // 看文档
      await this.success(res);
    } catch(err) {
      await this.fail(err);
    }
  }
  // 查询单个数据
  async show(){
    const { ctx } = this;

    // 1. 获取文章的id 2.查
    try{
      const postsId = ctx.params.id;
      // console.log('==========',postsId);
      const res = await ctx.service.posts.find({
        _id: postsId,
      }); // 看文档
      await this.success(res);
    } catch(err) {
      await this.fail(err);
    }
  }

  async destroy() {
    // 1. 获取id 2. 删除
    const { ctx } = this;

    // 1. 获取文章的id 2.删除
    try{
      const postsId = ctx.params.id;

      const res = await ctx.service.posts.remove({
        _id: postsId,
      }); 
      await this.success(res);
    } catch(err) {
      await this.fail(err);
    }
  }
  
  async update() {
    // 1. 获取 id  2. request body 3. 更新操作
    const { ctx } = this;

    try {
      const postsId = ctx.params.id;
      const requestBody = ctx.request.body;
  
      const res = await ctx.service.posts.update({  // 1. 查询条件 2.更新的数据
        _id: postsId,
      }, {
        $set: {  // 约束
          ...requestBody
        }
      });
      await this.success(res)
    } catch(err) {
      await this.fail(err);
    }
  }
}

module.exports = HomeController;
