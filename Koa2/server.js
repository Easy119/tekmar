const Koa = require("koa2");
const Router = require("koa-router");
const router = new Router()
const server = new Koa();
const routerLib = require("./router/index")
const cors = require("koa2-cors")
const koaBodyparser = require("koa-bodyparser");
const koaBody = require('koa-body');
const koaStatic = require('koa-static')
const path = require('path');
server.use(cors({
  origin: function (ctx) {
    console.log(ctx)
    // if (ctx.url === '/') {
    //   return '*';
    // }
    return 'http://localhost:80';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
server.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  // ctx.set("Access-Control-Allow-Headers", "X-Requested-With")
  ctx.set("Content-Type", "text/plain");
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With ');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
server.use(koaStatic(path.join(__dirname, './public')))
// server.use(jsonp())
server.use(koaBody({
  multipart: true, // 支持文件上传
  encoding: 'gzip',
  formidable: {
    hash:'md5',
    uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize: 50 * 1024 * 1024, // 文件上传大小
    onFileBegin: (name, file) => { // 文件上传前的设置
      console.log(`name: ${name}`);
      console.log(file);
    },
  }
}));






server.use(koaBodyparser())
server.use(routerLib())
server.use(router.routes())
// 创建https服务器实例
server.listen("80", () => {
  console.log("官网接口run 80s")
})