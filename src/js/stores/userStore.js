var EventEmitter = require("eventemitter3");
var $ = require("jquery");

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
		return true;
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
	currentUser = null;
}

userStore.fake = function () {
	currentUser = {
		name: "Rannah or Jordan",
		pw: "123"
	}
}

userStore.getErrors = function () {
	return errors;
}

userStore.sendText = function () {
	$.ajax({
		url: "https://AC2fa44e47bb9d8dc45cea27b0101d6536: 97ad6a8ccc5e9a06a93d1807f65347ac@api.twilio.com/2010-04-01/Accounts/AC2fa44e47bb9d8dc45cea27b0101d6536/Messages",
		method: "POST",
		data: {
			To: "+18036400682",
			From: "+18033355829",
			Body: "This is a test message from your computer."
		}
	})
}

window.userStore = userStore;

module.exports = userStore;