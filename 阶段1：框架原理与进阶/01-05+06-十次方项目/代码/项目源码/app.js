const express = require('express')
const config = require('./config/config.default')
const nunjucks = require('nunjucks')
const session = require('express-session')
const path = require('path')
const proxy = require('http-proxy-middleware')
const cookieParser = require('cookie-parser')
const _ = require('lodash')
const rememberMe = require('./middleware/remember-me')
const router = require('./router/')
const questionRouter = require('./router/question')
const commentRouter = require('./router/comment')
const voteRouter = require('./router/vote')
const tagRouter = require('./router/tag')
const peopleRouter = require('./router/people')
const userRouter = require('./router/user')
const settingRouter = require('./router/setting')
const workRouter = require('./router/work')

const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn') // 按需加载
dayjs.locale('zh-cn') // 全局使用西班牙语

const md = require('markdown-it')()

const app = express()

// 配置代理中间件
app.use('/api', proxy({
  // /api/upload
  // http://192.168.10.217:8000/api/v1/upload
  target: config.baseURL, // 代理的目标网址
  changeOrigin: true,
  pathRewrite: {
    '^/api' : '',
  },
}))

// 配置解析 Cookie 的中间件
app.use(cookieParser())

// 配置 Session 中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// 开放 public 目录资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use(express.json()) // application/json 格式的数据 {key: value, key: value...}
app.use(express.urlencoded({
  extended: true
})) // application/x-www-form-urlencoded key=value&key=value...

const env = nunjucks.configure(path.join(__dirname, './view/'), {
  autoescape: true,
  express: app,
  watch: true // 启动模板文件监视，文件改变，重新预编译，建议开发阶段开启此功能
})

env.addFilter('relativeTime', function(time) {
  return dayjs().from(dayjs(time))
})

env.addFilter('mdToHtml', function (mdContent) {
  return md.render(mdContent)
})

env.addGlobal('pageItems', function (lastPage, page) {
  const allPageItems = _.range(1, lastPage + 1)
  const range = 2
  // 得到当前页的后两页
  const afterPageItems = allPageItems.slice(page, page + range)
  
  // 得到当前页的前两页
  const beforePageItems = allPageItems.slice(page - lastPage - range - 1, page - 1)
  
  let pageItems =  [
    ...beforePageItems,
    page,
    ...afterPageItems
  ]

  let firstItem = [1]
  let lastItem = [lastPage]

  if (range + 2 < page) {
    firstItem = [
      ...firstItem,
      '...'
    ]
  }

  if (lastPage - page - 1 > range) {
    lastItem = [
      '...',
      ...lastItem
    ]
  }

  if (range + 1 < page) {
    pageItems = [
      ...firstItem,
      ...pageItems
    ]
  }

  if (lastPage - page > range) {
    pageItems = [
      ...pageItems,
      ...lastItem
    ]
  }

  return pageItems
})

app.use(rememberMe)

app.use((req, res, next) => {
  // 挂载到 app.locals 中的数据可以直接在模板页中访问
  app.locals.sessionUser = req.session.user
  app.locals.config = config
  next()
})

app.use(router)
app.use(questionRouter)
app.use(commentRouter)
app.use(voteRouter)
app.use(tagRouter)
app.use(peopleRouter)
app.use(userRouter)
app.use(settingRouter)
app.use(workRouter)

app.use((err, req, res, next) => {
  const response = err.response
  if (response) {
    res.status(response.status).send(response.data)
  } else {
    res.status(500).send(err)
  }
})

app.listen(3000, () => {
  console.log('服务启动成功.')
  console.log(`http://localhost:3000/`)
})
