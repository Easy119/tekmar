const News = require("../pages/news")
const Img = require("../pages/upload")
module.exports = {
    // "POST/Lanter/sendResult" : Lanter.sendResult,
    "GET/news/title/list" : News.newTitle,
    "GET/news/title/detail" : News.newDetail,
    'POST/upload': Img.upload
}