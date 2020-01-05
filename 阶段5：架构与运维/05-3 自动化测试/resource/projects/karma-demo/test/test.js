import { describe } from "mocha";
import { expect } from 'chai'

describe('first test', () => {
  it('hello mocha and karma', () => {
    console.log('hello mocha')
    expect(true).to.be.equal(true)
  })
})