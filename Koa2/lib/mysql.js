const mysql = require("mysql");
const SqlConfig = {
    host: "localhost",
    port: "3306",
    password: "123456",
    user: "root",
    database: '369' // 选中数据库
}
const pool = mysql.createPool(SqlConfig)
let query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function ( err,connection) {
            connection.query(sql, (error, results, fields) => {
                // 结束会话
                connection.release();
                // 如果有错误就抛出
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
            })
        })
    })
}
module.exports = {
    query,SqlConfig
}