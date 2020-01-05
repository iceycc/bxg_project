const User = require('../service/user')
const svgCaptcha = require('svg-captcha')
const Joi = require('joi')
const config = require('../config/config.default')
const { encrypt } = require('../utils/cipher')
const Question = require('../service/question')
const Comment = require('../service/comment')
const Tag = require('../service/tag')

/**
 * 渲染首页
 */
exports.showIndex = async(req, res, next) => {
  const _limit = 5
  let { _page = 1, filter = '', tags = '' } = req.query

  const { data: questions, headers } = await Question.find({
    _page,
    _limit,
    filter,
    tags
  })

  const total = headers['x-total-count'] - 0

  // 添加内容的用户信息
  for (let i = 0; i < questions.length; i++) {
    const item = questions[i]
    const user = await User.findById(item.userId)
    item.user = user
  }

  const { data: tag } = await Tag.findByName(tags)

  const { data: tagList } = await Tag.find({
    _page: 1,
    _limit: 2
  })

  res.render('index.html', {
    questions,
    _page: _page - 0,
    _limit: _limit - 0,
    total: total - 0,
    lastPage: Math.ceil((total / _limit)),
    tag,
    tagList,
    filter,
    tabs: [
      { filter: '', href: `/?_page=1&tags=${tags}`, title: '最新' },
      { filter: 'hot', href: `/?filter=hot&_page=1&tags=${tags}`, title: '热门' },
      { filter: 'unresponsive', href: `/?filter=unresponsive&_page=1&tags=${tags}`, title: '等待回复' }
    ]
  })
}

/**
 * 渲染注册|登录页面
 */
exports.showLogin = async(req, res, next) => {
  res.render('login.html')
}


/**
 * 用户注册
 */
exports.signup = async(req, res, next) => {
  try {
    // 1. 获取数据
    const { email, password, nickname, captcha } = req.body
    const { captcha: sessionCaptcha } = req.session

    // 如果当前最新时间超过了会话验证码的过期时间
    if (+new Date() > sessionCaptcha.expires) {
      return res.status(200).json({
        code: 4,
        message: '验证码已过期'
      })
    }

    // 2. 表单数据验证
    // 验证码校验
    if (captcha.toLowerCase() !== sessionCaptcha.text.toLowerCase()) {
      return res.status(200).json({
        code: 1,
        message: '验证码错误'
      })
    }

    // 3. 业务处理
    const ret = await User.signup({
      email,
      password,
      nickname
    })

    // 注册成功，记录 Session
    req.session.user = ret

    res.send(ret)
  } catch (err) {
    next(err)
  }
}

/**
 * 验证码
 */
exports.captcha = async(req, res, next) => {
  const captcha = svgCaptcha.create() // 创建验证码
  req.session.captcha = {
    text: captcha.text, // 验证码文本内容
    expires: +new Date() + 1000 * 60 * 10 // 验证码过期时间
  } // 把验证码存储到会话 Session 中
  res.type('svg') // 设置响应内容类型
  res.status(200).send(captcha.data) // 发送响应结果
}

/**
 * 校验验证码
 */
exports.checkCaptcha = async(req, res, next) => {
  const { captcha } = req.query
  const { captcha: sessionCaptcha } = req.session
  let ret = false

  if (!sessionCaptcha) {
    res.end()
  }

  // 如果验证码没有过期并且用户输入的验证码和 Session 中的验证码一致
  if (+new Date() < sessionCaptcha.expires && captcha.toLowerCase() === sessionCaptcha.text.toLowerCase()) {
    ret = true
  }
  res.status(200).send(ret)
}

/**
 * 用户登录
 */
exports.signin = async(req, res, next) => {
  try {
    const { email, password, remember } = req.body

    const user = await User.signin({
      email,
      password
    })

    // 用户登录成功，记录 Session 保存登录状态
    req.session.user = user

    // 记住我
    if (remember) {
      const encryptUser = encrypt(JSON.stringify({
        email,
        password
      }))
      res.cookie('user', encryptUser, {
        maxAge: config.rememberMeExpires // 滑动过期时间，单位是毫秒，1000 * 60 * 60 * 24
      })
    }

    res.send(user)
  } catch (err) {
    next(err)
  }
}

/**
 * 用户退出
 */
exports.signout = async(req, res, next) => {
  // 1. 清除 Session 中的登录信息
  req.session.user = null
  // 2. 清除 Cookie 中的登录信息
  res.clearCookie('user')
  // 3. 重定向到登录页
  res.redirect('/login')
}
