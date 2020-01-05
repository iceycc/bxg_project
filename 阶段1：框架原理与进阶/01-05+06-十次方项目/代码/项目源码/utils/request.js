const axios = require('axios')
const config = require('../config/config.default')

// 配置 axios 请求的基准路径
const instance = axios.create({
  baseURL: config.baseURL
})

// 定制请求、响应拦截器...业务操作

module.exports = instance
