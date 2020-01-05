import { expect } from 'chai'
import { addNum } from '../src/index'
// const expect = require('chai').expect
// const addNum = require('../src/index')

describe('测试index.js', function () {
  before(() => console.info("在本区块的所有测试用例之前执行"))

  after(() => console.info("在本区块的所有测试用例之后执行"))

  beforeEach(() => console.info("在本区块的每个测试用例之前执行"))

  afterEach(() => console.info("在本区块的每个测试用例之后执行"))

  // test suite
  describe('测试addNum函数', function () {
    // test case
    // beforeEach fn
    it('两个参数相加结果为两个数字的和', function () {
      expect(addNum(1, 2)).to.be.equal(3);
    })
    // afterEach fn
    // beforeEach fn
    it('两个参数相加结果不为和以外的数', function () {
      expect(addNum(1, 2)).to.be.not.equal(4);
    })
    // afterEach fn
  })
})
// after fn