const User = require('../service/user')
const Work = require('../service/work')

exports.showProfile = async (req, res, next) => {
  const { data: user } = await User.findById(req.session.user._id)
  const { data: works } = await Work.findByUserId(user._id)
  res.render('settings/profile.html', {
    user,
    works
  })
}

exports.showAccount = async (req, res, next) => {
  const { data: user } = await User.findById(req.session.user._id)
  res.render('settings/account.html', {
    user
  })
}
