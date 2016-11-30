var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var ReactRouter = require("react-router");

var store = require("store");

var userStore = Object.create(EventEmitter.prototype);
EventEmitter.call(userStore);


// Collection
var currentUser = null;

var errors = {
	emailError: "",
	passwordError: ""
}

userStore.getUser = function () {
	return currentUser; 	
};

userStore.isAuth = function () {
	if (currentUser) {
		if(currentUser.email) {
			return true;
		}
	} else {
		return false;
	}
};

userStore.register = function (email, pw) {
	errors = {
		emailError: "",
		passwordError: ""
	}
	var _this = this;
	$.ajax({
		url: "/api/register",
		method: "POST",
		data: {
			email: email,
			pw: pw
		},
		success: function (result) {
			currentUser = result;

			ReactRouter.hashHistory.push("/home");

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
	// Wipe localStorage pseudouser
	if (store.get("pseudo")) {
		store.clear();
	}
	errors = {
		emailError: "",
		passwordError: ""
	}
	var _this = this;
	$.ajax({
		url: "/api/login",
		method: "POST",
		data: {
			email: email,
			pw: pw
		},
		success: function (result) {
			currentUser = result;
			ReactRouter.hashHistory.push("/");
			_this.emit("update");
			store.set("session", currentUser);
			return currentUser;
		},
		error: function (result) {
			errors.emailError = result.responseJSON.emailError;
			errors.passwordError = result.responseJSON.passwordError;
			_this.emit("error");
		}
	})
	return null; 
};

userStore.logOut = function () {
	userStore.pseudo();
	this.emit("update");
	ReactRouter.hashHistory.push("/");
}

userStore.pseudo = function () {
	currentUser = {
		email: null,
		pw: null,
		tracking: [],
		settings: null
	}

	// Check to see if there is localStorage pseudo data
	if (store.get("pseudo")) {
		let tracking = store.get("pseudo").tracking;
		currentUser.tracking = tracking;
	}
}

userStore.fake = function () {
	currentUser = {
		name: "Rannah or Jordan",
		pw: "123",
		tracking: [],
		settings: []
	}
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
			}
		})
	} else {
	//Action to perform if it is a pseudouser

	// Update localStorage
		if (store.get('pseudo')) {
			let tracking = store.get("pseudo").tracking;
			tracking.push(id);
			store.set('pseudo', { tracking: tracking})
			currentUser.tracking = tracking;
		} else {
			store.set("pseudo", {tracking: []});

			let tracking = store.get("pseudo").tracking;

			tracking.push(id);
			store.set('pseudo', { tracking: tracking});

			currentUser.tracking = tracking;
		}
		_this.emit("update");

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
		this.emit("update");
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
	currentUser = store.get("session");
	this.emit("update");
}

userStore.getLocalUser = function () {
	return store.get("pseudo");
}

window.userStore = userStore;

module.exports = userStore;