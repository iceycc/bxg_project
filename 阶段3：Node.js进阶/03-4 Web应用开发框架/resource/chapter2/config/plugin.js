'use strict';
var path = require('path');
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  nunjucks: {   // 告诉egg 需要假如模板引擎
    enable: true,
    package: 'egg-view-nunjucks'
  },
  a: {  // 如果不配置依赖关系，按照引入顺序。如果确认了依赖关系，会先加载依赖项 
    enable: true,
    package: 'egg-a',
    path: path.resolve(__dirname, '../app/lib/plugin/egg-a'),
    dependencies: ['b']
  },
  b: {
    enable: true,
    package: 'egg-b',
    path: path.resolve(__dirname, '../app/lib/plugin/egg-b'),
  }
};