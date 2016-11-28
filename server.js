var request = require("request");
var express = require("express");
var lowdb = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");
var shortid = require("shortid");
var bodyParser = require("body-parser");


var app = express();
var db = lowdb("db.json", {storage: fileAsync});
var port = 8000;

app.use(bodyParser());
// app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


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
		res.json({emailError: "", passwordError: "Incorrect password"});
	}
})

app.post("/api/getshows", function (req, res) {
	// request.post('https://anilist.co/api/auth/access_token?grant_type=client_credentials&client_id=nehima99-gjdk3&client_secret=lRRcrrDkMtZttGF8GNn', function (error, response, body) {
	// 	res.json(body);
	// })

	// request.post({
	// 	url: "https://api.thetvdb.com/login", 
	// 	json: true,
	// 	body: {"apikey": "1205F191EB0365DE"}
	// 	}, 
	// 	function (error, response, body) {
	// 		var token = body.token;
	// 		request({
	// 			url: "https://api.thetvdb.com/search/series?name=cowboy%20bebop",
	// 			headers: {Authorization: "Bearer " + token},
	// 			},
	// 			function (error, response, body) {
	// 				res.json(body)
	// 			}
	// 		)
	// 	}
	// )

	request.post("https://anilist.co/api/auth/access_token?grant_type=client_credentials&client_id=nehima99-gjdk3&client_secret=lRRcrrDkMtZttGF8GNn", 
		function (error, response, body) {
			// var token = body["access_token"];
			var token = JSON.parse(body)["access_token"];
			request("https://anilist.co/api/browse/anime?status=currently%20airing&airing_data=true&type=Tv&page=1&access_token=" + token,
				function (error, response, body) {
					var results = [];
					var shows = JSON.parse(body);
					results = results.concat(shows);
					request("https://anilist.co/api/browse/anime?status=currently%20airing&airing_data=true&type=Tv&page=2&access_token=" + token,
						function (error, response, body) {
							shows = JSON.parse(body);
							results = results.concat(shows);
							res.json(results);
						}
					)
				}
			)
		}
	)

	
})

app.listen(port);