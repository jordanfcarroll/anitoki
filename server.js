var express = require("express");
var lowdb = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");
var shortid = require("shortid");
var bodyParser = require("body-parser");


var app = express();
var db = lowdb("db.json", {storage: fileAsync});
var port = 8000;

app.use(bodyParser());


// {
// 	email: "Jordan",
// 	pw: "123",
// 	tracking: [],
// 	settings: []
// }


// __dirname is a string that reference the current directory
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/lib"));





db.defaults({
	users: []
}).value();

app.post("/api/register", function (req, res) {

	var userData = req.body;

	// Search server to see if given email has already been registered

	var email = db.get("users").find({email: userData.email});
	if (email.value()) {
		res.status(401);
		res.json({emailError: "That email has already been registered", passwordError: ""});
	} else {
		var newUser = {
			email: userData.email,
			pw: userData.pw,
			tracking : [],
			settings : []
		}
		db.get("users").push(newUser).value();
		res.json(newUser);
	}

})

app.post("/api/login", function (req, res) {

	var query = req.body;
	var match = db.get("users").find({email: query.email});
	if (!match.value()) {
		res.status(404);
		res.json({emailError: "Could not find email", passwordError: ""});
	} else if (match.value().pw === query.pw) {
		res.json(match);
	} else {
		res.status(401);
		res.json({emailError: "", passwordError: "Password does not match"});
	}

})


app.listen(port);