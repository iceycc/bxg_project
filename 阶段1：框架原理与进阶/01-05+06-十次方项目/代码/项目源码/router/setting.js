const express = require('express')
const userCtrl = require('../controller/user')
const settingCtrl = require('../controller/setting')

const router = express.Router()

router
  .get('/settings/profile', settingCtrl.showProfile)
  .get('/settings/account', settingCtrl.showAccount)
  .post('/settings/profile/base', userCtrl.updateBase)
  .post('/settings/profile/avatar', userCtrl.updateAvatar)

module.exports = router
