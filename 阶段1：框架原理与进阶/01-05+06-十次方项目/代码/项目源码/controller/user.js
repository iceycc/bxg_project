const User = require('../service/user')

exports.updateBase = async (req, res, next) => {
  const { data } = await User.updateBaseByUserId(req.session.user._id, req.body)
  res.redirect('back')
}

exports.updateAvatar = async (req, res, next) => {
  try {
    const { data } = await User.updateAvatarById(req.session.user._id, req.body)
    // 重新刷新 Session 中的用户信息
    req.session.user = data
    res.status(201).send(data)
  } catch (err) {
    next(err)
  }
}

exports.updatePassword = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body
    const { data } = await User.updatePassword(req.session.user._id, {
      password,
      newPassword
    })
    res.status(201).send({
      msg: 'OK'
    })
  } catch (err) {
    next(err)
  }
}

exports.updateUrlToken = async (req, res, next) => {
  try {
    const { urlToken } = req.body
    const { data } = await User.updateUrlToken(req.session.user._id, {
      urlToken
    })
    res.status(201).send({
      msg: 'OK'
    })
  } catch (err) {
    next(err)
  }
}

exports.check = async (req, res, next) => {
  const { username, nickname } = req.query
  let user
  if (username) { // 校验用户名是否存在
    user = await User.findByUsername(username)
  } else if (nickname) { // 校验昵称是否存在
    user = await User.findByNickname(nickname)
  }
  res.status(200).send(user ? false : true)
}
