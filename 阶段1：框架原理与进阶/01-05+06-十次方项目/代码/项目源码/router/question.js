const express = require('express')
const questionCtrl = require('../controller/question')
const { body } = require('express-validator/check')
const checkSchema = require('../middleware/check-schema')

const router = express.Router()

router
  .get('/questions/new', questionCtrl.showNew)

router
  .post('/questions', ...checkSchema([
    body('title').not().isEmpty(),
    body('tags').not().isEmpty(),
    body('body').not().isEmpty()
  ]), questionCtrl.create)

router
  .get('/questions/:id', ...checkSchema([
  ]), questionCtrl.show)

router
  .get('/questions/:id/edit', questionCtrl.showEdit)

router
  .patch('/questions/:id', questionCtrl.update)

router
  .delete('/questions/:id', questionCtrl.destroy)

module.exports = router
