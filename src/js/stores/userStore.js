var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var ReactRouter = require("react-router");

var store = require("store");


// Encryption

var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

function encrypt(data, key) {
   return CryptoJS.AES.encrypt(data, key).toString();
}

const KEY = "asldkjioawejfa212jaw";




var userStore = Object.create(EventEmitter.prototype);
EventEmitter.call(userStore);

// Collection
var currentUser = {
	isAuth: false,
	settings: {
		countdown: false,
		notifications: "none"
	}
};

var errors = {
	emailError: "",
	passwordError: ""
}

userStore.getUser = function () {
	return currentUser; 	
};

userStore.isAuth = function () {
	return userStore.getUser();
};

userStore.register = function (email, pw) {
	var _this = this;
	const localTracking = store.get("pseudo").tracking;

	const encryptedPw = encrypt(pw, KEY);

	errors = {
		emailError: "",
		passwordError: ""
	}
	$.ajax({
		url: "/api/register",
		method: "POST",
		data: {
			email: email,
			pw: encryptedPw,
			tracking: localTracking
		},
		success: function (result) {
			currentUser = result;
			store.clear();
			store.set("session", currentUser.email);

			ReactRouter.hashHistory.push("/");
			_this.emit("update");


			return currentUser;
		},
		error: function (result) {
			errors.emailError = result.responseJSON.emailError;
			errors.passwordError = result.responseJSON.passwordError;
			_this.emit("error");
		}
	})
}

userStore.logIn = function (email, pw) {	
	errors = {
		emailError: "",
		passwordError: ""
	}

	const encryptedPw = encrypt(pw, KEY);

	var _this = this;
	$.ajax({
		url: "/api/login",
		method: "POST",
		data: {
			email: email,
			pw: encryptedPw
		},
		success: function (result) {
			// Clear current pseudo-user data on submit
			if (store.get("pseudo")) {
				store.clear();
			}
			// Set currentUser to the response to from the user db on server
			currentUser = result;
			userStore.emit("update");

			// Redirect to home
			ReactRouter.hashHistory.push("/");

			// Create a user session in localStorage
			store.set("session", currentUser.email);
			return currentUser;
		},
		error: function (result) {
			errors.emailError = result.responseJSON.emailError;
			errors.passwordError = result.responseJSON.passwordError;

			_this.emit("error");
			return null;
		}
	})
	return null; 
};

userStore.logOut = function () {
	// Clear session
	store.clear();

	userStore.pseudo();
	ReactRouter.hashHistory.push("/");
}

userStore.pseudo = function () {
	currentUser = {
		email: null,
		pw: null,
		tracking: [],
		settings: null,
		isAuth: false
	}

	// Check to see if there is localStorage pseudo data
	if (store.get("pseudo")) {
		let tracking = store.get("pseudo").tracking;
		currentUser.tracking = tracking;
	} else {
		store.set("pseudo", {tracking: []});
	}

	this.emit("update");
}

userStore.getErrors = function () {
	return errors;
}

userStore.track = function (id) {
	var _this = this;

	// Action to perform if performed user is bonafide
	if (currentUser.tracking.indexOf(id) === -1 && currentUser.email) {
		$.ajax({
			url: "/api/track",
			data: {
				"email": currentUser.email,
				"id": id
			},
			method: "PUT",
			success: function (result) {
				currentUser = result;
				_this.emit("update");
				_this.emit("resultupdate");
			}
		})
	} else if (!currentUser.email){
	//Action to perform if it is a pseudouser
	// Update localStorage
		let tracking = store.get("pseudo").tracking;
		tracking.push(id);
		store.set('pseudo', { tracking: tracking})
		currentUser.tracking = tracking;

		_this.emit("update");
		_this.emit("resultupdate");

	}

}

userStore.untrack = function (id) {
	var _this = this;

	// Action to take if currentUser is bonafide
	if (currentUser.tracking.indexOf(id) !== -1 && currentUser.email) {
		$.ajax({
			url: "/api/untrack",
			data: {
				email: currentUser.email,
				id: id
			},
			method: "PUT",
			success: function (result) {
				currentUser = result;
				_this.emit("update");
				_this.emit("resultupdate");
			}
		})
	} else {
		// Action to take if currentUser is pseudo
		let tracking = store.get("pseudo").tracking;

		// Check to ensure nothing weird happens
		if (tracking.indexOf(id) >= 0) {
			tracking.splice(tracking.indexOf(id), 1);
		}
		// Set tracking to new post-splice value
		store.set("pseudo", {tracking: tracking});
		currentUser.tracking = tracking;
		_this.emit("update");
		_this.emit("resultupdate");
	}
}


// userStore.sendText = function () {
// 	$.ajax({
// 		url: "https://AC2fa44e47bb9d8dc45cea27b0101d6536: 97ad6a8ccc5e9a06a93d1807f65347ac@api.twilio.com/2010-04-01/Accounts/AC2fa44e47bb9d8dc45cea27b0101d6536/Messages",
// 		method: "POST",
// 		data: {
// 			To: "+18036400682",
// 			From: "+18033355829",
// 			Body: "This is a test message from your computer."
// 		}
// 	})
// }

userStore.getTracking = function () {
	return currentUser.tracking;
}

userStore.isTracking = function (id) {
	return (currentUser.tracking.indexOf(id) >= 0) 
}

userStore.getLocalSession = function () {
	return store.get("session");
}

userStore.setSession = function () {
	var _this = this;

	const email = store.get("session");

	$.ajax({
		url: "/api/session",
		method: "POST",
		data: {
			email: email
		},
		success: function (result) {
			currentUser = result;
			_this.emit("update")
		},
		error: function (result) {
			userStore.clearLocalStorage();
			userStore.pseudo();
			_this.emit("update")
		}
	})
}

userStore.getLocalUser = function () {
	return store.get("pseudo");
}

userStore.clearLocalStorage = function() {
	store.clear();
}

userStore.getSettings = function () {
	return currentUser.settings;
}

window.userStore = userStore;

module.exports = userStore;