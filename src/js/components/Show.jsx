var React = require("react");
var ReactRouter = require("react-router");



var Show = React.createClass({
	getInitialState: function () {
		return {
			initialCountdown: new Date().getTime()/1000,
			currentRemaining: this.props.show.airing.countdown
		}
	},
	

	render: function () {
		var time;
		var _this = this;

		if (this.props.countdown) {
			
			time = <p className="show-time">{this.parseCountdown(this.props.show.airing.countdown - this.props.timeSinceUpdate)}</p>

		} else {
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


		// Currently evaluates to SC time
		// time.convertTimezone();
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

		// 

		let hours = Math.floor(seconds / 3600);
		let minutes = Math.floor(seconds/60 - hours*60);
		seconds = seconds % 60;

		const timeString = String(hours) + 'h ' + String(minutes) + "m " + String(seconds) + "s"

		return timeString;
	}
});

module.exports = Show;