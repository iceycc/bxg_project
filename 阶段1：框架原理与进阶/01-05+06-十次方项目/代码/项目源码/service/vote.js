const request = require('../utils/request')

exports.find = async (vote) => {
  return request({
    url: '/votes',
    method: 'GET',
    params: {
      type: vote.type,
      typeId: vote.typeId,
      userId: vote.userId
    }
  })
}

exports.create = async (vote) => {
  return request({
    url: '/votes',
    method: 'POST',
    data: {
      type: vote.type,
      typeId: vote.typeId,
      value: vote.value,
      userId: vote.userId
    }
  })
}
