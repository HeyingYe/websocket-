var ws = require("ws");
var express = require("express");
var app = express();
var server = app.listen(80,function(){
	console.log("listen 80")
});
//引进路由模块
var router = require("./router");
//引进ws模块
var websocket = require("./websocket.js");
//开启路由
router.router(app);
//实例化ws对象，开启ws服务
// var wss  = new ws.Server({
// 	Server:"10.3.135.48",
// 	port:88
// })
//引用http服务,开启ws服务
var wss = new ws.Server({
	server:server
});
//websocket逻辑运算
websocket(wss);
