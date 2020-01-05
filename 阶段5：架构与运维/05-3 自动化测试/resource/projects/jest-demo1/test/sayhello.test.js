const bot = {
  sayHello: name => {
    console.log(`Hello ${name}!`);
  }
};

describe("bot", () => {
  it("should say hello", () => {
    const spy = jest.spyOn(bot, "sayHello");

    bot.sayHello("Michael");

    expect(spy).toHaveBeenCalledWith("Michael");

    spy.mockRestore();
  });
});