const request = require('../utils/request')

exports.find = async (options) => {
  return request({
    url: '/posts',
    method: 'GET',
    params: {
      _page: options._page || 1,
      _limit: options._limit || 10,
      filter: options.filter || '',
      tags: options.tags || ''
    }
  })
}

exports.findByUserId = async (options) => {
  return request({
    url: '/posts',
    method: 'GET',
    params: {
      userId: options.userId
    }
  })
}

exports.findByComments = async (userId) => {
  return request({
    url: `/users/${userId}/comments/questions`,
    method: 'GET'
  })
}

exports.create = async (post) => {
  const { data } = await request({
    url: '/posts',
    method: 'POST',
    data: {
      title: post.title,
      body: post.body,
      tags: post.tags,
      userId: post.userId
    }
  })
  return data
}

exports.findById = async (id) => {
  const { data } = await request({
    url: `/posts/${id}`,
    method: 'GET'
  })
  return data
}

exports.updateById = async (id, question) => {
  const { data } = await request({
    url: `/posts/${id}`,
    method: 'PATCH',
    data: {
      title: question.title,
      body: question.body,
      tags: question.tags
    }
  })
  return data
}

exports.deleteById = async (id) => {
  const { data } = await request({
    url: `/posts/${id}`,
    method: 'DELETE'
  })
  return data
}
