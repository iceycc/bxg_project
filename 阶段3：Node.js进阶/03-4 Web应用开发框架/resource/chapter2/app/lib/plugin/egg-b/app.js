module.exports = app => {
    app.testapp = '添加了一个app的属性';

    app.once('server', server => {
      // websocket
      // console.log('b 插件加载了');
    });
  };