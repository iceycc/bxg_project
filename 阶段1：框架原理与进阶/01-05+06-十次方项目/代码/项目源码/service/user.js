const request = require('../utils/request')

exports.findByNickname = async (nickname) => {
  const { data } = await request({
    url: '/users',
    method: 'GET',
    params: {
      nickname
    }
  })
  return data[0]
}

exports.findByUrlToken = async (urlToken) => {
  return request({
    url: `/users/url_token/${urlToken}`,
    method: 'GET'
  })
}

exports.updateUrlToken = async (userId, data) => {
  return request({
    url: `/users/${userId}/url_token`,
    method: 'PATCH',
    data: {
      urlToken: data.urlToken
    }
  })
}

exports.updateAvatarById = async (userId, data) => {
  return request({
    url: `/users/${userId}/avatar`,
    method: 'PATCH',
    data: {
      file: data.file,
      x: data.x,
      y: data.y,
      width: data.width,
      height: data.height
    }
  })
}

exports.findById = (userId) => {
  return request({
    url: `/users/${userId}`,
    method: 'GET'
  })
}

exports.findByUsername = async (username) => {
  const { data } = await request({
    url: '/users',
    method: 'GET',
    params: {
      username
    }
  })
  return data[0]
}

exports.signin = async (user) => {
  const { data } = await request({
    url: '/users/signin',
    method: 'POST',
    data: {
      email: user.email,
      password: user.password
    }
  })
  return data
}

exports.signup = async (user) => {
  const { data } = await request({
    url: '/users/signup',
    method: 'POST',
    data: {
      email: user.email,
      password: user.password,
      nickname: user.nickname
    }
  })
  return data
}

exports.create = async (user) => {
  const { data } = await request({
    url: '/users',
    method: 'POST',
    data: {
      username: user.username,
      password: user.password,
      nickname: user.nickname
    }
  })
  return data
}

exports.updateBaseByUserId = async (userId, user) => {
  return request({
    url: `/users/${userId}/profile`,
    method: 'PATCH',
    data: user
  })
}

exports.updatePassword = async (userId, data) => {
  return request({
    url: `/users/${userId}/password`,
    method: 'PATCH',
    data: {
      password: data.password,
      newPassword: data.newPassword
    }
  })
}
