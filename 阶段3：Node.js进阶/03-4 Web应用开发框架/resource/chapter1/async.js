var koa = require('koa');
var app = new koa();

// next前面的代码，按照use的顺序执行，next后面的代码反着执行。

var log3 = function() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log('<< three');
            res()
        }, 2000);
    });
}


// koa结论： next方法其实就是指的， 当前执行函数的下一个use里面的方法。
const one = async function(ctx, next) {
    console.log('>> one');
    await next();  // tow
    console.log('<< one');
}
  
  const two = async function(ctx, next) {
    console.log('>> two');
    await next();  // three
    console.log('<< two');
  }
  // koa支持 es7 async和 await
  const three = async function(ctx, next) {
    console.log('>> three');
    next();  //  空
    // console.log('<< three');
    // await setTimeout(() => {  // await需要 promise
    //     console.log('<< three')
    // };
    await log3();
  }

//   three();
  
  // 他们3个都是中间件， next
  app.use(one);
  app.use(two);
  app.use(three);

  app.listen(3000);