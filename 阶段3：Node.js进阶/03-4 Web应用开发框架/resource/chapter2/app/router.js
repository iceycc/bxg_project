'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);  // 命名空间， egg的约定
  router.get('/hello', controller.home.hello);  
  router.resources('/api/posts', controller.posts);
  router.post('/adduser', controller.home.addUser);
  router.get('/redirect', controller.home.redirect);  
  router.get('/user', controller.sub.user.index);  
  router.get('/csrf', controller.csrf.index);
  router.get('/404', controller.home.getdata);
};
