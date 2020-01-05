// agent.js
module.exports = agent => {

    agent.messenger.on('egg-ready', () => {
        console.log('egent 开始运行了');
        // 在agent里面发消息，必须  egg-ready 这样一个事件里面发送  ！！！！！！

        agent.messenger.broadcast('all', '大家涨工资！！！！');
    });
};