const Vote = require('../service/vote')

exports.create = async (req, res, next) => {
  try {
    const voteRes = await Vote.create(req.body)
    const data = voteRes.data
    data.voteCount = voteRes.headers['x-vote-count'] // 最新的总票数
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}
