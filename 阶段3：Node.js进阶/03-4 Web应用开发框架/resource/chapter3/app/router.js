'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.resources('posts', '/api/posts', controller.home);

  // 增 删 改 查(1. 查一条 2. 查全部)  
};
