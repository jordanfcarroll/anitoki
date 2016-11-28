var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var showStore = Object.create(EventEmitter.prototype);
EventEmitter.call(showStore);

// Update time set to every ten minutes
const UPDATE_TIME = 600000;
var lastUpdate = 0;


// Collection
var shows = [];


showStore.getShows = function () {
	return shows;
},

showStore.pollForUpdate = function () {
	console.log("Polling for update...")
	let currentTime = new Date().getTime();
	if (currentTime - lastUpdate > UPDATE_TIME) {
		console.log("Update required. Updating...")
		lastUpdate = currentTime;
		return showStore.fetchShows();
	} else {
		return shows;
	}
}

showStore.fetchShows = function () {
	$.ajax({
		url: "/api/getshows",
		method: "POST",
		success: function (results) {
			shows = results;
		}
	})
	return shows;
}


window.showStore = showStore;

module.exports = showStore;