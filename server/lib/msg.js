let _OK = (msg) => {
    return `{"flag":true,"code":0,"msg":${JSON.stringify(msg)}}`
};
let _Err = (msg) => {
    return `{"flag":false,"code":1,"msg":${JSON.stringify(msg)}}`
};
module.exports = {
    ok:_OK,
    _err:_Err
}