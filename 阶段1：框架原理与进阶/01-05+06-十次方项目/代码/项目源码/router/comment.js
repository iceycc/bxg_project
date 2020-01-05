const express = require('express')
const router = express.Router()
const commentCtrl = require('../controller/comment')

router
  .get('/comments', commentCtrl.list)
  .get('/comments/:id', commentCtrl.one)
  .post('/comments', commentCtrl.create)
  .patch('/comments/:id', commentCtrl.update)
  .delete('/comments/:id', commentCtrl.destroy)

module.exports = router
