const request = require('../utils/request')

exports.create = async (comment) => {
  const { data } = await request({
    url: '/comments',
    method: 'POST',
    data: {
      body: comment.body,
      userId: comment.userId,
      postId: comment.postId
    }
  })
  return data
}

exports.getCountByPostId = postId => {
  return request({
    url: '/comments/count',
    method: 'GET',
    params: {
      postId
    }
  })
}

exports.findByPostId = async (postId) => {
  const { data } = await request({
    url: '/comments',
    method: 'GET',
    params: {
      postId
    }
  })
  return data
}

exports.deleteById = async (commentId) => {
  const { data } = await request({
    url: `/comments/${commentId}`,
    method: 'DELETE'
  })
  return data
}

exports.updateById = async (commentId, comment) => {
  const { data } = await request({
    url: `/comments/${commentId}`,
    method: 'PATCH',
    data: {
      body: comment.body
    }
  })
  return data
}
