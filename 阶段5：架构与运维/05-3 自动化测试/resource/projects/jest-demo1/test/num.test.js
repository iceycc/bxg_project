import { getNum } from '../src/getNum'

describe("getNum", () => {
  it("should select numbber based on index if provided", () => {
    expect(getNum(1)).toBe(2);
  });

  it("should select a random number based on Math.random if skuId not available", () => {
    const spy = jest.spyOn(Math, "random").mockImplementation(() => 0.9);

    expect(getNum()).toBe(6);
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});