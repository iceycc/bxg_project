// module.exports = app => {
//     app.testapp = '添加了一个app的属性';

//     app.once('server', server => {
//       // websocket
//       console.log('http 服务启动完毕');
//     });

//     app.on('request', ctx => {
//       // log receive request
//       console.log('======= request')
//     });
//     app.on('response', ctx => {
//       // ctx.starttime is set by framework
//     //   const used = Date.now() - ctx.starttime;
//       console.log('======= response')
//       // log total cost
//     });
//   };

function createSQL(config, app) {
    // 创建msql实例
    console.log('!!!!!!!!!!!', config)
    return {};  // 假装是mysql的实例
}

class AppBootHook {
    constructor(app) {
        // debugger;
        app.once('server', server => {
            // websocket
            console.log('http 服务启动完毕');  // info
        });

        app.messenger.on('all', (data) => {
            // console.log(',,,,,,,,,,,', data);
        });
        // console.log(Object.keys(app))
        app.addSingleton('mysql', createSQL);   //  1. 字符串 2.方法
    }

    configWillLoad() {
        // 在配置加载之前的一个hooks
        // 在这里我们还有最后一次机会去修改 配置
        // 只能是同步的

        // 1.mysql密码在这里可以解密

        console.log('======= configWillLoad')
    }

    async didLoad() {
        // 配置已经加载完成
        // 配置非常的稳定
        // 1.可以读取配置，运行一些其它的服务。第三方的服务需要读取egg配置

        console.log('=========  didLoad')
    }

    async willReady() {
        // 所有插件已经加载完成，应用整体还没ready

        // 类似 componentWillMount
        // 先初始化一些数据
        console.log('==========  willReady')
    }

    async didReady() {
        // 应用启动完毕

        // 应用场景： 1. 请求之外创建ctx
        // createAnontmousContext()

        console.log('==========  didReady')
    }

    async serverDidReady(app) {
        // http服务启动完成
        console.log('==========  serverDidReady')
        // app.addSingleton('mysql', createSql)
    }

}

module.exports = AppBootHook;