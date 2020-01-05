const Nightmare = require('nightmare')
const assert = require('assert')

describe('first mocha and nightmare test', function () {
  let nightmare = null
  this.timeout('30s')

  beforeEach(() => {
    nightmare = new Nightmare()
  })

  it('should load nightmare', (done) => {
    nightmare.goto('https://www.baidu.com')
      .end()
      .then(function (result) {
        done()
      })
      .catch(done)
  })

  it('should load nightmare', (done) => {
    const selector = 'em'
    nightmare.goto('https://www.baidu.com')
      .type('#kw', 'nightmare')
      .click('#su')
      .wait('em')
      .evaluate(selector => {
        return document.querySelector(selector).innerText
      }, selector)
      .end()
      .then(function (result) {
        console.log(result)
        assert.equal(result, 'nightmare')
        done()
      })
      .catch(done)
  })
})