
var ejs = require("ejs");

/*
 * GET home page.
 */
exports.login = function(req,res){
	console.log("login........");
 res.render('login.ejs');	
};

exports.home = function(req, res){
  res.render('home.ejs');
};

exports.index = function(req, res){
res.render('frontpage.ejs');
};

exports.maps = function(req,res){
res.render('map.ejs');
};
