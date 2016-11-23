var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var userStore = Object.create(EventEmitter.prototype);
EventEmitter.call(userStore);



// Collection
var currentUser = null;

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

userStore.logIn = function (name, pw) {
	currentUser = {
		name: name,
		pw: pw
	}
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




window.userStore = userStore;

module.exports = userStore;