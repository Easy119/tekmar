const db = require("../lib/mysql")
const bodyFtl = require("../lib/msg")
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
    let { id } = ctx.method == "GET" ? ctx.request.query : ctx.request.body;;
    try {
        let { id } = ctx.method == "GET" ? ctx.request.query : ctx.request.body;;
        let sql =  `SELECT * FROM news_titles  WHERE id = ${parseInt(id)}`;
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
let create = async (ctx) =>{
  try {

  } catch {
    throw new Error()
  }
}
module.exports = {
    newTitle,newDetail
}
