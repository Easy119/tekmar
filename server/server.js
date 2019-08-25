const Koa = require("koa2");
const Router = require("koa-router");
const router = new Router()
const server = new Koa();
const routerLib = require("./router/index")
const cors = require("koa2-cors")
const koaBodyparser= require("koa-bodyparser");
const koaBody = require('koa-body');
const koaStatic = require('koa-static')
const path = require('path');
const jsonp = require('koa-jsonp')
const ueditor = require("ueditor")
 
// server.use(jsonp())
 
server.use(koaBody({
    multipart:true, // 支持文件上传
    encoding:'gzip',
    formidable:{
        uploadDir:path.join(__dirname,'public/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        maxFieldsSize:50 * 1024 * 1024, // 文件上传大小
        onFileBegin:(name,file) => { // 文件上传前的设置
          console.log(`name: ${name}`);
          console.log(file);
        },
    }
}));






// server.use(koaBodyparser())
server.use(koaStatic(path.join(__dirname,'./public')))
server.use(cors({
    origin: function(ctx) {
        if (ctx.url === '/test') {
          return false;
        }
        return 'http://localhost:8081';
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
server.use(routerLib())
server.use(router.routes())
// 创建https服务器实例
server.listen("8089",()=>{
    console.log("官网接口run 8089")
})