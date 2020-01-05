const Question = require('../service/question')
const User = require('../service/user')
const Vote = require('../service/vote')

exports.listByUserId = async(req, res, next) => {
  try {
    const { userId } = req.params

    const { data } = await Question.find({
      userId
    })

    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

exports.listByComments = async(req, res, next) => {
  try {
    const { userId } = req.params

    const { data } = await Question.findByComments(userId)

    res.status(200).send(data)
  } catch (err) {
    next(err)
  }
}

exports.showNew = async(req, res, next) => {
  res.render('questions/new.html')
}

exports.show = async(req, res, next) => {
  try {
    const { id: questionId } = req.params
    const question = await Question.findById(questionId)
    if (!question) {
      return res.render('error.html', {
        message: '该资源已不存在！'
      })
    }
    question.user = await User.findById(question.userId)
    const { data: votes } = await Vote.find({
      type: 'posts',
      typeId: questionId,
      userId: req.session.user._id
    })
    question.vote = votes[0]
    res.render('questions/show.html', {
      question
    })
  } catch (err) {
    next(err)
  }
}

exports.create = async(req, res, next) => {
  try {
    const { title, tags, body } = req.body
    const ret = await Question.create({
      title,
      tags,
      body,
      userId: req.session.user._id
    })
    res.send(ret)
  } catch (err) {
    next(err)
  }
}

exports.showEdit = async(req, res, next) => {
  try {
    const ret = await Question.findById(req.params.id)
    if (!ret) {
      return res.render('error.html', {
        message: '该资源已不存在！'
      })
    }
    res.render('questions/edit.html', {
      question: ret
    })
  } catch (err) {
    next(err)
  }
}

exports.update = async(req, res, next) => {
  const { title, tags, body } = req.body
  const data = await Question.updateById(req.params.id, {
    title,
    tags,
    body
  })
  res.send(data)
}

exports.destroy = async(req, res, next) => {
  try {
    const ret = await Question.deleteById(req.params.id)
    res.send(ret)
  } catch (err) {
    next(err)
  }
}
