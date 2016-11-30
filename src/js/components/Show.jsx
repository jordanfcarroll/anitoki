var React = require("react");
var ReactRouter = require("react-router");



var Show = React.createClass({

	render: function () {
		return (
			<div>
				<p>{this.props.show.title_romaji}</p>
				<p>{this.parseTime(this.props.show.airing.time)}</p>
			</div>
		);
	},

	parseTime: function (date) {
		let time = new Date(date);

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
		timeString += time.getMinutes(); 
		if (time.getMinutes() === 0) {
			timeString += "0";
		}
		timeString += amPm;
		return timeString;
	}
});

module.exports = Show;