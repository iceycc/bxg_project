const Comment = require('../service/comment')

exports.list = async (req, res, next) => {
  const { postId } = req.query
  const data = await Comment.findByPostId(postId)
  res.status(200).send(data)
}

exports.one = async (req, res, next) => {
  res.send('one')
}

exports.create = async (req, res, next) => {
  const { body, postId } = req.body
  const data = await Comment.create({
    body,
    postId,
    userId: req.session.user._id
  })
  res.send(data)
}

exports.update = async (req, res, next) => {
  const { id } = req.params
  const { body } = req.body
  const ret = await Comment.updateById(id, {
    body
  })
  res.status(201).send(ret)
}

exports.destroy = async (req, res, next) => {
  const { id } = req.params
  await Comment.deleteById(id)
  res.status(204).send({})
}
