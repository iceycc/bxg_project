const Work = require('../service/work')

exports.create = async (req, res, next) => {
  const { data:ret } = await Work.create(req.body)
  res.redirect('back')
}

exports.delete = async (req, res, next) => {
  const { data: ret } = await Work.deleteById(req.params.workId)
  res.send(ret)
}
