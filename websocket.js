module.exports = function(wss){
	wss.on("connection",function(ws){
		ws.on("message",function(str){
			//处理客户端发送的数据
			var dataObj = JSON.parse(str);
			console.log(dataObj)
			wss.broadcast(dataObj);
		})
		ws.on("close",function(str){
			//客户端的ws服务关闭触发，默认接收1000的状态码，
			// 接收的不是客户端发送的信息,所以若需要发送用户的信息，
			// 则需要先将信息绑定到客户端对象ws上，例如：this.user = obj;(this指向的是ws对象)
			//用户下线
			// console.log(str) //1000
			// var dataObj = JSON.parse(str); //1000
			// wss.broadcast(dataObj);
		})
	})
	wss.broadcast = function(obj){
		// console.log(wss.clients)
		wss.clients.forEach(function(client){
			if(obj.state == 0){//上线
				client.send(JSON.stringify(obj));
			}else if(obj.state == 1){//发言
				client.send(JSON.stringify(obj));
			}else if(obj.state == 2){//下线
				client.send(JSON.stringify(obj));
			}
		})
	}
}