
const math = require('../src/math')

describe("math", () => {
  let a
  let b

  beforeEach(function () {
    a = 2;
    b = 3;
  });

  test("#should return result as a+b", () => {
    // test code
    const result = math.add(a, b)
    expect(result).toEqual(5)
  });

  it("#should return result as a*b", () => {
    //test code
    const result = math.multiple(a, b)
    expect(result).toEqual(6)
  });
});