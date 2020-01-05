import { expect } from "chai"
import sayHello from "../src/index"

describe("index test", () => {
  describe("sayHello function", () => {
    it("should say Hello world!!!", () => {

      const str = sayHello();
      expect(str).to.equal("Hello world!!!")
    })
  })
})