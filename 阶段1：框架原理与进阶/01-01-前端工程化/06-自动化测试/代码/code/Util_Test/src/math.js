const min = (a,b) => {
    const c = 3
    return (b-a)*c
}

module.exports = {
  add(...args) {
    return args.reduce((prev, curr) => {
      return prev + curr;
    });
  },
  mul(...args) {
    return args.reduce((prev, curr) => {
      return prev * curr;
    });
  },
  //覆盖率测试
  cover(a, b) {
    if (a > b) {
      return a - b;
    }else if(a===b){
        return a
    }else{
        return min(a,b)
    }
  }
};
