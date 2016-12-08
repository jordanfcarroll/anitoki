var React = require("react");
var ReactRouter = require("react-router");

var findDOMNode = require("react-dom").findDOMNode;
var Tweenmax = require("gsap").Tweenmax;

console.log("show");

var Show = React.createClass({

	componentWillEnter: function (callback) {
		const el = findDOMNode(this);
    	TweenMax.fromTo(el, 2, {opacity: 0}, {opacity: 1, delay: (this.props.number * .1), onComplete: callback});
	},

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
				<p className="show-title" onClick={this.setShow}>{this.props.show.title_english}</p>
				{time}
			</div>
		);
	},

	parseTime: function (date) {

		var timeString;

		if (this.checkHasAired(this.props.show.airing.time)) {
			timeString = "Aired!";
			return timeString;
		}


		let amPm = " AM";


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

		var timeString;

		if (this.checkHasAired(this.props.show.airing.time)) {
			timeString = "Aired!";
			return timeString;
		}

		let days = Math.floor(seconds / 86400)
		let hours = Math.floor(seconds / 3600 - days*24);
		let minutes = Math.floor(seconds / 60 - days*24*60 - hours*60);
		seconds = seconds % 60;

		let daysString = "";
		let hoursString = "";
		let minutesString = "";
		let secondsString = "";

		if (days !== 0) {
			daysString = String(days) +"d ";
		}
		if (hours !== 0) {
			hoursString = String(hours) + "h ";
		}
		if (minutes !== 0) {
			minutesString = String(minutes) + "m ";
		}
		if (seconds !== 0) {
			secondsString = String(seconds) + "s";
		}

		timeString = daysString + hoursString + minutesString + secondsString;

		return timeString;
	},

	checkHasAired: function (date) {
		let time = new Date(date);
		let current = new Date();

		if (current.getDay() - time.getDay() > 0) {
			return true;
		} else if (current.getDay() === time.getDay() && current.getHours() - time.getHours() > 0) {
			return true;
		} else if (current.getDay() === time.getDay() && 
				current.getHours() === time.getHours() > 0 &&
				current.getMinutes() - time.getMinutes() > 0) {
			return true;
		}
	},

	setShow: function() {
		this.props.setShow(this.props.show.id);
	}
});

module.exports = Show;