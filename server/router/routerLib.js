const News = require("../pages/news")
module.exports = {
    // "POST/Lanter/sendResult" : Lanter.sendResult,
    "GET/news/title/list" : News.newTitle,
    "GET/news/title/detail" : News.newDetail,
    "POST/news/img/upload" : News.uploadImg,
    "GET/news/img/upload" : News.uploadImg
}