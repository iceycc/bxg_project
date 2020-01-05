//1. 写一个中间件

module.exports = (options, app) => {
    console.log('option', options)
    return async function log(ctx, next) {
        console.log(options.content || '默认值');
        await next();
    }
}