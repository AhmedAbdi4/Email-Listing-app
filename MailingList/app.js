//MailingList app.js

var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	database:'join_us'
});

app.get("/", function(req,res){
// 	Find count of users in DB
	var q = "select count(*) AS count from users";
	connection.query(q, function (error, results){
		if (error) throw error;
		var count = results[0].count;
		res.render('index', {data:count});

	});		
});

app.post('/register', function(req, res){
	var email = req.body.email;
	var person = {
		email: req.body.email
	};
	
	connection.query('INSERT INTO users SET ?', person, function(error, result){ 
		if (error) throw error;
		res.redirect('/');
	   });
});

app.listen(3000, function(){
	console.log("Server running on 3000!");
});

