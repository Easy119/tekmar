const db = require("../lib/mysql")
const bodyFtl = require("../lib/msg")
const config = require("../lib/config.json")
const koaueditor = require("ueditor-koa");
/*
    新闻列表
    详情
 */
let newTitle = async (ctx) => {
  let sql = `SELECT * FROM news_titles `;
  let result = await db.query(sql);
  if (result) {
    ctx.body = bodyFtl.ok(result)
  } else {
    ctx.body = bodyFtl._err()
  }
}
let newDetail = async (ctx) => {
    // let { id } = ctx.method == "GET" ? ctx.request.query : ctx.request.body;;
    try {
        let { id } = ctx.method == "GET" ? ctx.request.query : ctx.request.body;;
        let sql =  `SELECT * FROM news_titles left join news_contents on news_titles.id=news_contents.classid WHERE news_titles.id = ${parseInt(id)}`;
        let result = await db.query(sql);
        if (result) {
            ctx.body = bodyFtl.ok(result)
          } else {
            ctx.body = bodyFtl._err()
          }
    } catch{
        throw new Error()
    }
}
// 图片上传
let uploadImg = async (ctx)=>{
  var uedictx = new koaueditor(ctx, {
    statc_path: "/public",//静态目录,文件保存根目录
  });
  let part, stream, tmp_name, file_path, filename;
  const ActionType = ctx.query.action;
  console.log(ActionType)
  if (ActionType == 'config') {
    let callback = ctx.request.query.callback;
    ctx.body = `${callback}(${JSON.stringify(config)})`;
  } else if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
    // let files = ctx.request.files; // 获取上传文件
    // let file_url = files.upfile.path.split('public/')[1];
    // // ctx.body = bodyFtl.ok({file_url:`${ctx.host}/${file_url}`})
    // ctx.body = {file_url:`${ctx.host}/${file_url}`};
    await uedictx.ue_save('public/upload')
  } //  客户端发起图片列表请求
  else if (ActionType === 'listimage') {
    // let callback = ctx.request.query.callback;
    // ctx.body = `${callback}(${ctx.host}/upload/upload_2eb55f0358b3c3cffe8faaead12b189a.jpg)`;
    let result = await uedictx.ue_list('public/upload');//默认列出 image目录下的文件
    console.log(result)
  }
  // let files = ctx.request.files; // 获取上传文件
  // console.log(files.flie)
  // let file_url = files.flie.path.split('public/')[1];
  // console.log(JSON.stringify(ctx.request.files))
  // ctx.body = bodyFtl.ok({file_url:`${ctx.host}/${file_url}`})
}

module.exports = {
    newTitle,newDetail,uploadImg
}
