const Tag = require('../service/tag')

exports.index = async (req, res, next) => {
  const { _limit = 20, _page = 1 } = req.query
  const { data, headers } = await Tag.find({
    _page,
    _limit
  })
  const totalCount = headers['x-total-count']
  res.render('tags/index.html', {
    tags: data,
    _limit: Number.parseInt(_limit),
    _page: Number.parseInt(_page),
    lastPage: Math.ceil(totalCount / _limit)
  })
}

exports.filterByFollowers = async (req, res, next) => {
  const { userId } = req.params
  const { data } = await Tag.filterByFollowers(userId)
  res.status(200).send(data)
}

exports.follow = async (req, res, next) => {
  try {
    const { tagName } = req.params
    const userId = req.session.user._id
    const { data } = await Tag.follow(tagName, {
      userId
    })
    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}
