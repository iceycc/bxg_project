setImmediate(() => {
    console.log('setImmediate');
})

setTimeout(() => {
    console.log('setTimeout')
}, 0)

// setTimeout 和 setImmediate执行顺序不确定？？？？？？