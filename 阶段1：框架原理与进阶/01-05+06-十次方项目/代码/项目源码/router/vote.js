const express = require('express')

const router = express.Router()
const voteCtrl = require('../controller/vote')

router
  .post('/votes', voteCtrl.create)

module.exports = router
