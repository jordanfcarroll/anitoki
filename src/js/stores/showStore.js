var EventEmitter = require("eventemitter3");
var $ = require("jquery");

var showStore = Object.create(EventEmitter.prototype);
EventEmitter.call(showStore);


// Collection
var shows = [];


showStore.getShows = function () {
	return shows;
}

showStore.fetchShows = function () {
	$.ajax({
		url: "/api/getshows",
		method: "POST",
		success: function (results) {
			shows = results;
		}
	})
	return null;
}


window.showStore = showStore;

module.exports = showStore;