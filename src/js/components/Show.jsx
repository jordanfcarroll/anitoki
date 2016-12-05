var React = require("react");
var ReactRouter = require("react-router");



var Show = React.createClass({

	render: function () {
		var time;
		var _this = this;

		if (this.props.showtime === "countdown") {
			
			time = <p className="show-time">{this.parseCountdown(this.props.show.airing.countdown - this.props.timeSinceUpdate)}</p>

		} else if (this.props.showtime === "showtime") {
			time = <p className="show-time">{this.parseTime(this.props.show.airing.time)}</p>;
		}

		return (
			<div className="show-info">
				<p className="show-title">{this.props.show.title_english}</p>
				{time}
			</div>
		);
	},

	parseTime: function (date) {

		let time = new Date(date);


		let amPm = " AM";

		let timeString = "";

		if (time.getHours() > 12) {
			let hours = time.getHours();
			if (hours >= 12) {
				amPm = " PM"
			}
			hours -= 12;
			timeString += hours;
		} else if (time.getHours() === 0) {
			let hours = 12;
		} else {
			timeString += time.getHours();
		}

		timeString += " : "; 
		if (time.getMinutes() < 10) {
			let minutes = "0" + time.getMinutes();
			timeString += minutes;
		} else {
			timeString += time.getMinutes(); 
		}
		timeString += amPm;
		return timeString;
	},

	parseCountdown: function (seconds) {

		let days = Math.floor(seconds / 86400)
		let hours = Math.floor(seconds / 3600 - days*24);
		let minutes = Math.floor(seconds / 60 - days*24*60 - hours*60);
		seconds = seconds % 60;

		const timeString = String(days) + "d " + String(hours) + 'h ' + String(minutes) + "m " + String(seconds) + "s";

		return timeString;
	}
});

module.exports = Show;