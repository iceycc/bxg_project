const request = require('../utils/request')
const router = require('express').Router()

router
  .post('/likes', async (req, res, next) => {
    const { type } = req.body
    let { status, typeId } = req.body
    status = status - 0
    typeId = typeId - 0
    const userId = req.session.user.id
    const { data } = await request({
      url: '/likes',
      method: 'GET',
      params: {
        type,
        typeId,
        userId
      }
    })
    let ret = null
    const like = data[0]
    if (like) {
      const { data } = await request({
        url: `/likes/${like.id}`,
        method: 'PATCH',
        data: {
          status: status === like.status ? 0 : status
        }
      })
      ret = data
    } else {
      // 创建
      const { data } = await request({
        url: '/likes',
        method: 'POST',
        data: {
          type: type,
          status: status,
          typeId: typeId,
          userId
        }
      })
      ret = data
    }
    res.json(ret)
  })

module.exports = router
