const User = require('../service/user')
const { decrypt } = require('../utils/cipher')

module.exports = async(req, res, next) => {
  const { user: sessionUser } = req.session

  // 如果 Session 中没有登录状态，则查找 Cookie 中是否有用户信息
  if (!sessionUser) {
    let { user: cookieUser } = req.cookies

    // 如果 Cookie 中也没有用户信息，则什么都不处理
    if (!cookieUser) {
      return next()
    }

    // 代码执行到这里，意味着 Cookie 中有用户信息
    // 那么我们就校验该用户信息是否正确
    try {
      cookieUser = JSON.parse(decrypt(cookieUser))
      const ret = await User.signin({
        email: cookieUser.email,
        password: cookieUser.password
      })
      // 保持登录状态
      req.session.user = ret
    } catch (err) {
      return next()
    }
  }

  // 如果 Session 中有登录状态，则继续往后执行
  next()
}
