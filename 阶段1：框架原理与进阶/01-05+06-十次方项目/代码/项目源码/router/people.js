const express = require('express')
const indexCtrl = require('../controller/index')
const userCtrl = require('../controller/user')
const { body, query } = require('express-validator/check')
const checkSchema = require('../middleware/check-schema')
const peopleCtrl = require('../controller/people')

const router = express.Router()

router
  .get('/people/:urlToken', peopleCtrl.showHome)

module.exports = router
