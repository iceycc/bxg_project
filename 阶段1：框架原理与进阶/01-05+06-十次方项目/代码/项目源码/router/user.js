const express = require('express')
const questionCtrl = require('../controller/question')
const workCtrl = require('../controller/work')
const userCtrl = require('../controller/user')

const router = express.Router()

// 查询指定用户的问题
router
  .get('/users/:userId/questions', questionCtrl.listByUserId)
  .get('/users/:userId/comments/questions', questionCtrl.listByComments)
  .patch('/users/update/password', userCtrl.updatePassword)
  .patch('/users/update/url_token', userCtrl.updateUrlToken)

module.exports = router
