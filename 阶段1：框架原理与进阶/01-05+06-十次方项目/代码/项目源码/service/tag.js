const request = require('../utils/request')

exports.find = async (options) => {
  return request({
    url: '/tags',
    method: 'GET',
    params: {
      _page: options._page,
      _limit: options._limit
    }
  })
}

exports.filterByFollowers = async (userId) => {
  return request({
    url: `/tags/followers/${userId}`,
    method: 'GET'
  })
}

exports.findByName = (tagName) => {
  return request({
    url: `/tags/${tagName}`,
    method: 'GET'
  })
}

exports.follow = (tagName, data) => {
  return request({
    url: `/tags/${tagName}/followers`,
    method: 'POST',
    data: {
      userId: data.userId
    }
  })
}
