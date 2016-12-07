var request = require("request");
var express = require("express");
var lowdb = require("lowdb");
var fileAsync = require("lowdb/lib/file-async");
var shortid = require("shortid");
var bodyParser = require("body-parser");

var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

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

var token;

app.post("/api/register", function (req, res) {

	var userData = req.body;
	var tracking;

	if (userData.tracking) {
		tracking = userData.tracking;
		trueTracking = tracking.map((value) => Number(value));
	} else {
		trueTracking = [];
	}

	// Search server to see if given email has already been registered
	var email = db.get("users").find({email: userData.email});
	if (email.value()) {
		res.status(401);
		res.json({emailError: "That email has already been registered", passwordError: ""});
	} else {
		var newUser = {
			email: userData.email,
			pw: userData.pw,
			tracking : trueTracking,
			isAuth: true,
			settings : {
				notifications: "none",
				showtime: "countdown",
				phone: null
			},
			pseudo: false
		}
		db.get("users").push(newUser).value();
		res.json(newUser);
	}

})

app.put("/api/updateemail", function (req,res) {
	var body = req.body;
	console.log(body);

	var user = db.get("users")
				.find({email: body.email})
				.value();

	user = db.get("users")
		.find({ email: body.email })
		.assign({ 
			email: body.newEmail,
			password: body.password
		})
		.value()


	// db.get("users")
	// 			.find({email: body.email})
	// 			.get("email")
	// 			.assign({
	// 				showtime: user.settings.showtime,
	// 				notifications: body.notifications,
	// 				phone: body.phone
	// 			})
	// 			.value()

	console.log(user);
	res.json(user);
})

app.post("/api/login", function (req, res) {

	const KEY = "asldkjioawejfa212jaw";

	var query = req.body;

	console.log(query);

	var bytes = CryptoJS.AES.decrypt(query.pw.toString(), KEY);
	var decryptedReceived = bytes.toString(CryptoJS.enc.Utf8);
	console.log(decryptedReceived);

	var match = db.get("users").find({email: query.email}).value();
	console.log(match);
	console.log(match.pw)

	bytes = CryptoJS.AES.decrypt(match.pw.toString(), KEY);
	var decryptedStored = bytes.toString(CryptoJS.enc.Utf8);
	console.log(decryptedStored);


	if (!match) {
		res.status(404);
		res.json({emailError: "Could not find email", passwordError: ""});
	} else if (decryptedReceived === decryptedStored) {
		res.json(match);
	} else {
		res.status(401);
		res.json({emailError: "", passwordError: "Incorrect password"});
	}
})

app.post("/api/getshows", function (req, res) {
	request.post("https://anilist.co/api/auth/access_token?grant_type=client_credentials&client_id=nehima99-gjdk3&client_secret=lRRcrrDkMtZttGF8GNn", 
		function (error, response, body) {
			// var token = body["access_token"];
			token = JSON.parse(body)["access_token"];
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

app.post("/api/getshowdetails", function (req, res) {
	let id = req.body.id;

	request("https://anilist.co/api/anime/" + id + "/page?access_token=" + token,
		function (error, response, body) {
			let details = JSON.parse(body);
			res.json(details);
		})
})



app.post("/api/welcometext", function (req, res) {
	const body = req.body;

	request.post({url:"https://AC2fa44e47bb9d8dc45cea27b0101d6536: 97ad6a8ccc5e9a06a93d1807f65347ac@api.twilio.com/2010-04-01/Accounts/AC2fa44e47bb9d8dc45cea27b0101d6536/Messages",
		form:{
			To: "+1" + String(body.phone),
			From: "+18033355829",
			Body: "You're registered for Anitoki text notifications!"
			},
		function (error, response, body) {
			
			res.json(error);
		}})
})

app.put("/api/track", function(req, res) {;
	let body = req.body;

	var user = db.get("users")
				.find({email: body.email})
				.value();


	// Converting ids to strings??
	db.get("users")
		.find({email: body.email})
		.get("tracking")
		.push(Number(body.id))
		.value();

	res.json(user);
})

app.put("/api/untrack", function(req, res) {
	let body = req.body;

	var user = db.get("users")
				.find({email: body.email})
				.value();	

	db.get("users")
		.find({email: body.email})
		.get("tracking")
		.remove(function (value) {
			if (value == body.id) {
				return true;
			}
		})
		.value();

	res.json(user);
});

app.post("/api/session", function (req, res) {
	const body = req.body;
	const match = db.get("users").find({email: body.email});

	if (match.value()) {
		res.json(match);
	} else {
		res.status(404);
		res.json({emailError: "Could not find email", passwordError: ""});
	}
});

app.put("/api/notifications", function (req, res) {
	const body = req.body;
	console.log(body);

	var user = db.get("users")
				.find({email: body.user.email})
				.value();

	db.get("users")
				.find({email: body.user.email})
				.get("settings")
				.assign({
					showtime: user.settings.showtime,
					notifications: body.notifications,
					phone: body.phone
				})
				.value()

	res.json(user);

});

app.put("/api/showtimes", function (req, res) {
	const body = req.body;

	var user = db.get("users")
				.find({email: body.user.email})
				.value();

	db.get("users")
				.find({email: body.user.email})
				.get("settings")
				.assign({
					showtime: body.showtime,
					notifications: user.settings.notifications
				})
				.value()

	res.json(user);



});



// $.ajax({
// 		url: "https://AC2fa44e47bb9d8dc45cea27b0101d6536: 97ad6a8ccc5e9a06a93d1807f65347ac@api.twilio.com/2010-04-01/Accounts/AC2fa44e47bb9d8dc45cea27b0101d6536/Messages",
// 		method: "POST",
// 		data: {
// 			To: "+1" + currentUser.phone,
// 			From: "+18033355829",
// 			Body: "You're registered for Anitoki text notifications!"
// 		}
// 	})


app.listen(port);