const Service = require('egg').Service;

class PostsService extends Service {
    // 增删改查 

    //新增
    async create(data) {  // 1. data 数据源
        const postsInstance = new this.ctx.model.Posts({ // egg会自动改为驼峰
            title: data.title,
            content: data.content,
        }); 

        const res = await postsInstance.save();  // 接受存储操作的结果
        
        return res;
    }

    async find(data) { // 1.查询的条件
        const res = await this.ctx.model.Posts.find(data);
        return res;
    }

    async remove(data) { // 1.查询的条件
        const res = await this.ctx.model.Posts.remove(data);
        return res;
    }

    async update(findData, data) {  // 1. 查询条件 2. 修改数据源
        const res = await this.ctx.model.Posts.update(findData, data);
        return res;
    }
}

module.exports = PostsService;