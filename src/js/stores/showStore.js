var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var showStore = Object.create(EventEmitter.prototype);
EventEmitter.call(showStore);

// Update time set to every ten minutes
const UPDATE_TIME = 600000;
var lastUpdate = 0;


// Collection
var shows = [];
var showObj = {};

// Time to keep track of how long shows have been displayed to calculate countdown
var timeSinceMount = 0;

window.setInterval(function () {
	timeSinceMount++;
	showStore.emit("timeupdate");
}, 1000);

showStore.setTime = function() {
	timeSinceMount = 0;
}

showStore.getTime = function () {
	return timeSinceMount;
}

showStore.getShows = function () {
	return shows;
},

showStore.getObj = function () {
	return showObj;
}

showStore.pollForUpdate = function () {
	// console.log("Polling for update...")
	let currentTime = new Date().getTime();
	if (currentTime - lastUpdate > UPDATE_TIME) {
		// console.log("Update required. Updating...")
		lastUpdate = currentTime;
		showStore.fetchShows();
		return null;
	} else {
		return shows;
	}
}

showStore.fetchShows = function () {
	var _this = this;
	$.ajax({
		url: "/api/getshows",
		method: "POST",
		success: function (results) {

			// Filter the shows because some of them don't have airing data
			let filteredShows = results.filter((show) => show.airing);

			shows = filteredShows;

			// Make show obj for simpler referencing by id
			showObj = filteredShows.reduce(function (a,b) {
				var key = b.id;
				var value = b;
				a[key] = value;
				return a;
			})


			_this.emit("update");
			console.log(shows);
		}
	})
	return null;
}



window.showStore = showStore;

module.exports = showStore;