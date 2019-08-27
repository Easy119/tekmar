const fs = require('fs')

fs.unlink('/Users/sogubaby/Desktop/box/tekmar/webber/tekmar/Koa2/public/upload/upload_9ef7893fe2e9ade726fa94f37969aaf3.jpg',(err)=>{
    if(err){
        console.log(err)
    }
    console.log("删除成功")
})