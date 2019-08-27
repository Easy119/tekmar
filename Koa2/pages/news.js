const db = require('../lib/mysql')
const bodyFtl = require('../lib/msg')
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
  let { id } = ctx.method == 'GET' ? ctx.request.query : ctx.request.body;;
  try {
    let { id } = ctx.method == 'GET' ? ctx.request.query : ctx.request.body;;
    let sql = `SELECT * FROM news_titles  WHERE id = ${parseInt(id)}`;
    let result = await db.query(sql);
    if (result) {
      ctx.body = bodyFtl.ok(result[0])
    } else {
      ctx.body = bodyFtl._err()
    }
  } catch{
    throw new Error()
  }
}
let create = async (ctx) => {
  try {
    let { content, des, news_title } = ctx.request.body;
    let news_img, thumbnailFile, sql;
    let publist_time = '2019-08-07 11:25:36';
    if (ctx.request.files.thumbnailFile) {
      thumbnailFile = ctx.request.files.thumbnailFile;
      news_img = getPath(thumbnailFile.path);
      sql = `INSERT INTO news_titles (id,news_title,news_img,publist_time,des,content) values (0,'${news_title}','upload/upload_${news_img}','${publist_time}','${des}','${content}')`;
    } 
    let result = await db.query(sql);
    if (result) {
      ctx.body = { msg: 'ok' }
    } else {
      ctx.body = bodyFtl._err({
        msg:ctx.message
      })
    }
  } catch{
    throw new Error()
  }
}

let updated = async (ctx) => {
  try {
    let { content, des, id, news_title } = ctx.request.body;
    let news_img, thumbnailFile, sql;
    let publist_time = '2019-08-07 11:25:36';
    if (ctx.request.files.thumbnailFile) {
      thumbnailFile = ctx.request.files.thumbnailFile;
      news_img = getPath(thumbnailFile.path);
      sql = `UPDATE news_titles set news_img = 'upload/upload_${news_img}' ,content = '${content}' ,des = '${des}',news_title = '${news_title}',publist_time = '${publist_time}' where id = '${id}'`;
    } else {
      news_img = getPath(ctx.request.body.news_img);
      sql = `UPDATE news_titles set news_img = 'upload/upload_${news_img}' ,content = '${content}' ,des = '${des}',news_title = '${news_title}',publist_time = '${publist_time}' where id = '${id}'`;
    }
    let result = await db.query(sql);
    if (result) {
      ctx.body = { msg: 'ok' }
    } else {
      ctx.body = bodyFtl._err()
    }
  } catch{
    throw new Error()
  }
}
let deleted = async (ctx) => {
  try {
    let {id} = ctx.request.query;
    let sql = `delete from news_titles where id = ${id}`;
    console.log(sql)
    let result = db.query(sql);
    if(result) {
      ctx.body = { msg: 'ok' }
    } else {
      ctx.body = bodyFtl._err()
    }
  } catch {
    throw new Error()
  }
}
function getPath(str) {
  return str.split('upload_')[1]
}
module.exports = {
  newTitle, newDetail, updated,create,deleted
}
