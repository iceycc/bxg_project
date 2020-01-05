const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')()
const cors = require('@koa/cors');

const app = new Koa();
app.use(bodyParser());
app.use(cors());

const { User } = require('./dbconfig')

router.get('/', async (ctx, next) => {
  try {
    const body = ctx.query
    var newUser = new User({
      name: body.name,
      gender: body.gender,
      email: body.email
    })
  
    var result = await newUser.save()
    // todo
    ctx.body = {
      code: 200,
      result: result
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      msg: e
    }
  }
})

// 在端口3000监听:
app.use(router.routes());
app.listen(3000);
