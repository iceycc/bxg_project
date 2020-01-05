/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1561714277339_9435';

  // add your middleware config here

// 2. 配置引入
  // config.middleware = [
  //   'log'
  // ];

  config.security = {
    domainWhiteList:['.baidu.com'],  // 安全白名单，以 . 开头
  };

  config.log = {
    content: '从配置来的日志'
  }

  config.view = {
    defaultViewEngine: 'nunjucks',  // 默认的模板引擎是 nunjucks
    mapping: {   // map
      '.nj': 'nunjucks',
    },
  };

  config.mysql = {
    client: {
      host: 'mysql.com',
      port: '3306',
      user: 'test_user',
      password: 'test_password',
      database: 'test',
    },
  };

  // config.onerror = {
  //   // 线上页面发生异常时，重定向到这个页面上
  //   all(err, ctx) {
  //     // 在此处定义针对所有响应类型的错误处理方法
  //     // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
  //     ctx.body = '你错误了 兄弟';
  //     ctx.status = 500;
  //   },
  // };

  config.notfound = {
    pageUrl: '/404',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
