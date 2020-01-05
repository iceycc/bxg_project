const express = require('express')
const indexCtrl = require('../controller/index')
const userCtrl = require('../controller/user')
const { body, query } = require('express-validator/check')
const checkSchema = require('../middleware/check-schema')

const router = express.Router()

router
  .get('/', indexCtrl.showIndex)

router
  .get('/login', indexCtrl.showLogin)
  .get('/signout', indexCtrl.signout)

router
  .post('/signup', ...checkSchema([
    body('email').not().isEmpty(),
    body('password').not().isEmpty(),
    body('nickname').not().isEmpty(),
    body('captcha').not().isEmpty()
  ]), indexCtrl.signup)

router
  .post('/signin', ...checkSchema([
    body('email').not().isEmpty(),
    body('password').not().isEmpty()
  ]), indexCtrl.signin)

router
  .get('/captcha', indexCtrl.captcha)

router
  .get('/captcha/check', ...checkSchema([
    query('captcha').not().isEmpty()
  ]), indexCtrl.checkCaptcha)

router
  .get('/users/check', userCtrl.check)

module.exports = router
