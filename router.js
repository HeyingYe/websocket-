var express = require("express");
var path = require("path");
exports.router = function(app){
	app.use(express.static(path.join(__dirname,"/client")));
}