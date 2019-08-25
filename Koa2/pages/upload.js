const db = require("../lib/mysql")
const bodyFtl = require("../lib/msg")
const path = require('path');
const fs = require('path')
/*
    新闻列表
    详情
 */
let upload = async (ctx) => {
    try {
        let file_upload = ctx.request.files.upload;
        let hash = file_upload.hash;
        // 查询数据是否存在该图片
        let hash_select = `select * from img_hash where hash = '${hash}'`;
        let hash_select_result = await db.query(hash_select);
        if (hash_select_result.length > 0) {
            // 删除刚刚长传的文件
            console.log('发现相同文件！');
            console.log(`./public/${hash_select_result[0].path}`);
            // fs.unlink(`/public/${hash_select_result[0].path}`, () => {
            //     console.log('sadfasd')
            //     if(err){
            //         console.log(err)
            //         // throw err;
            //     }
            //     console.log("删除成功")
            //     file_upload.path = hash_select_result[0].path;
            //     ctx.body = { path: file_upload.path}
            // });
            file_upload.path = hash_select_result[0].path;
            ctx.body = { path:`/${file_upload.path}`}
        } else {
            let insert_sql = `insert into img_hash (id,hash,path) values (0,'${hash}','upload/upload_${getPath(file_upload.path)}')`;
            let result = await db.query(insert_sql);
            if(result){
                ctx.body = { path: `/upload/upload_${getPath(file_upload.path)}`}
            }
        }
    } catch {

    }

}
function getPath(str){
    return str.split('upload_')[1]
}
module.exports = {
    upload
}
// 47ea73b5b66a0d408e99e85450e31841
// 47ea73b5b66a0d408e99e85450e31841