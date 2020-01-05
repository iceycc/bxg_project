const express = require('express')

const router = express.Router()
const tagCtrl = require('../controller/tag')

router
  .get('/tags', tagCtrl.index)
  .post('/tags/:tagName/followers', tagCtrl.follow)
  .get('/tags/followers/:userId', tagCtrl.filterByFollowers)

module.exports = router
