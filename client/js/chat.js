//信息模块 发送消息
function createMessage(state,flag){
	//{name:"aa",msg:"say",time:now,state:0/1/2}
	var date = new Date();
	var now = date.getMonth() + "/" + date.getDate() + " " +date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	// var flag = flag ? flag : false;//状态切换,默认为false
	return JSON.stringify({
		name:$("#nickName").val(),
		msg:$("#mesBox").val(),
		time:now,
		// change:flag,
		state:state//0:上线 1:发言 2:下线
	})
}
// console.log($("#btnConnection")[0])
//判断浏览器是否支持ws
var socket = null;
try{
	if(WebSocket){
		$("#btnConnection").click(function(){
			if(socket){
				//不允许重复连接
				return false;
			}
			//实例化ws对象，并连接socket服务器
			socket = new WebSocket("ws://10.3.135.48:80");
			//建立连接
			socket.onopen = function(){
				socket.send(createMessage(0,true))
				$(".connState").text("服务已连接 ws://10.3.135.48:80");				
			}
			//接收数据
			socket.onmessage = function(msg){
				var msgObj = JSON.parse(msg.data);
				if(msgObj.state == 0){
					//上线通知
					$('<p>'+msgObj.time + ' [' + msgObj.name + ']' + ' 进入聊天' + '</p>').appendTo('.msgList');
				}else if(msgObj.state == 1){
					//发言
					$('<p>'+msgObj.time + ' [' + msgObj.name + ']' + ' : ' + msgObj.msg + '</p>').appendTo('.msgList');
				}else if(msgObj.state == 2){
					//下线
					$('<p>'+msgObj.time + ' [' + msgObj.name + ']' + ' 退出聊天' + '</p>').appendTo('.msgList');
					socket.close();
				}
				//内容刷新，自动滚动
				var scrolll = $(".msgList")[0].scrollHeight - $(".msgList")[0].offsetHeight;
				if(scrolll > 0){
					$(".msgList").scrollTop(scrolll);
				}
			}
			socket.onclose = function(msg){
				$('.connState').text("服务已断开");				
				socket = null;
			}
			socket.onerror = function(){
				$('.connState').text("服务错误");				
				socket = null;
			}
		})

		$("#btnSend").click(function(){
			if(socket){
				console.log(createMessage(1))
				socket.send(createMessage(1))				
			}
		})
		$("#btnClose").click(function(){
			if(socket){
				//下线
				socket.send(createMessage(2))
				//ws服务关闭前发送的信息，服务器可接收到，
				// 但是服务器接收到后关闭就不会再发送信息给客户端
				// socket.close();
			}
		})
	}else{
		throw new Error("浏览器不支持WebSocket")
	}	
}catch(err){
	alert(err);
}