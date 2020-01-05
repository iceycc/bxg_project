const express = require('express')
const workCtrl = require('../controller/work')

const router = express.Router()

// 查询指定用户的问题
router
  .post('/works', workCtrl.create)
  .delete('/works/:workId', workCtrl.delete)

module.exports = router
