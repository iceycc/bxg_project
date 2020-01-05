const domains = [
  "img10.360buyimg.com",
  "img11.360buyimg.com",
  "img12.360buyimg.com",
  "img13.360buyimg.com",
  "img14.360buyimg.com"
];

const getImageDomain = skuId => {
  if (skuId) {
    return domains[skuId % 5];
  } else {
    return domains[Math.floor(Math.random() * 5)];
  }
};

describe("getImageDomain", () => {
  it("should select domain based on skuId if provided", () => {
    expect(getImageDomain(1)).toBe("img11.360buyimg.com");
  });

  it("should select a random domain based on Math.random if skuId not available", () => {
    const spy = jest.spyOn(Math, "random").mockImplementation(() => 0.9);

    expect(getImageDomain()).toBe("img14.360buyimg.com");
    expect(spy).toHaveBeenCalled();

    spy.mockRestore();
  });
});