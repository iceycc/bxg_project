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


  config.view = {
    defaultViewEngine: 'nunjucks',  // 默认的模板引擎是 nunjucks
    mapping: {   // map
      '.nj': 'nunjucks',
    },
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
