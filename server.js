var express = require("express");
var lowdb = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");
var shortid = require("shortid");
var bodyParser = require("body-parser");


var app = express();
var db = lowdb("db.json", {storage: fileAsync});

app.use(bodyParser());


// {
// 	email: "Jordan",
// 	pw: "123",
// 	tracking: [],
// 	settings: []
// }





db.defaults({
	users: []
}).value();

var port = 3000;

// __dirname is a string that reference the current directory
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/lib"));




app.post("/register", function (req, res) {

	var userData = req.body;

	// Search server to see if given email has already been registered

	var email = db.get("users").find({email: userData.email});
	if (email.value()) {
		res.json("That email has already been registered");
	} else {
		newUser = {
			email: userData.email,
			pw: userData.pw,
			tracking : [],
			settings : []
		}
		db.get("users").push(newUser).value();
		res.json(newUser);
	}

})



app.listen(port);