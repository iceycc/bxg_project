const User = require('../service/user')
const Work = require('../service/work')

exports.showHome = async (req, res, next) => {
  const { data: user } = await User.findByUrlToken(req.params.urlToken)
  const { data: works } = await Work.findByUserId(user._id)
  user.work = works[0] || {}
  res.render('people/home.html', {
    user
  })
}
