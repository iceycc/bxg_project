var koa = require('koa');
var app = new koa();

// next前面的代码，按照use的顺序执行，next后面的代码反着执行。

// koa结论： next方法其实就是指的， 当前执行函数的下一个use里面的方法。
const one = (ctx, next) => {
    console.log('>> one');
    next();  // tow
    console.log('<< one');
  }
  
  const two = (ctx, next) => {
    console.log('>> two');
    next();  // three
    console.log('<< two');
  }
  
  const three = (ctx, next) => {
    console.log('>> three');
    next();  //  空
    console.log('<< three');
  }
  
  // 他们3个都是中间件， next
  app.use(one);
  app.use(two);
  app.use(three);

  app.listen(3000);