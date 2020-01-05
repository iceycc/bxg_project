import { expect } from 'chai'
import sayHello from '../src/index'

// test suite outer
describe('index test', () => {
  /// test suite inner
  describe('sayHello function', () => {
    // test case
    it('should say Hello world!!!', () => {
      const str = sayHello()
      expect(str).to.equal('Hello world!!!')
    })
  })
})