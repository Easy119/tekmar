const Router = require("koa-router")
const router = new Router();
const routerArray = require("./routerLib")
function routerLib(){
    for(let item in routerArray){
        if(item.startsWith("GET")){
            let path = item.substr(4);
            router.get(`/${path}`,routerArray[item])
        }else{
            let path = item.substr(5);
            router.post(`/${path}`,routerArray[item])
        }
    }
}
module.exports = function(){
    routerLib()
    return router.routes()
}