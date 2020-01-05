var Service = require('egg').Service;

class DataService extends Service {
    async index() {
        // 省略数据读取
        return {
            name: 'jack',
            age: 18
        }
    }
}

module.exports = DataService;