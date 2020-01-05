const request = require('../utils/request')

exports.create = (data) => {
  return request({
    url: '/works',
    method: 'POST',
    data
  })
}

exports.findByUserId = (userId) => {
  return request({
    url: `/users/${userId}/works`,
    method: 'GET'
  })
}

exports.deleteById = (wordId) => {
  return request({
    url: `/works/${wordId}`,
    method: 'DELETE'
  })
}

exports.updateById = (wordId, data) => {
  return request({
    url: `/works/${wordId}`,
    method: 'PATCH',
    data
  })
}
