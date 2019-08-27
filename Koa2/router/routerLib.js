const News = require("../pages/news")
const Img = require("../pages/upload")
module.exports = {
    // "POST/Lanter/sendResult" : Lanter.sendResult,
    "GET/news/title/list" : News.newTitle,
    "GET/news/title/detail" : News.newDetail,
    'POST/news/updated': News.updated,
    'POST/news/create': News.create,
    'GET/news/delete': News.deleted,
    'POST/upload': Img.upload
}