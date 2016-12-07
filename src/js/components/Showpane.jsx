var React = require("react");

var Tweenmax = require("gsap").Tweenmax;
var ReactTransitionGroup = require('react-addons-transition-group');

var findDOMNode = require("react-dom").findDOMNode;

var Showpane = React.createClass({
	getInitialState: function () {
		return {
			class: "showpane"
		}
	},

	componentWillAppear: function (callback) {
    	const el = findDOMNode(this);
    	TweenMax.fromTo(el, .4, {x: -600, opacity: 0}, {x: 0, opacity: 1, onComplete: callback});
  	},


	render: function () {	
		var externalLinks;
		var button;

		if (this.props.show.external_links) {
			externalLinks = this.props.show.external_links.map(function (value) {
				return (
					<div>
						<a target="_blank" href={value.url}>{value.site}</a>
					</div>
					);
			})
		}

		if(this.props.isTracking) {
			button = <button className="follow-toggle unfollow" onClick={this.untrackThisShow}>Unfollow</button>
		} else {
			button = <button className="follow-toggle" onClick={this.trackThisShow}>Follow</button>
		}



		return (
				<div className={this.state.class}>
					<div className="show-info-wrapper">
						<div className="showpane-top-bumper"></div>
						<button className="fa fa-times close-show" onClick={this.props.unsetShow}></button>
						<img src={this.props.show.image_url_lge} />
						<div className="show-aag">
							<h3>{this.props.show.title_romaji}</h3>
							<p>Next episode: </p>
							<div className="showpane-time">
								<p>{this.parseTime(this.props.show.airing.time)}</p>
							</div>
							{button}
						</div>
					</div>
					<div className="show-info">
						<h3>English Title</h3>
						<p>{this.props.show.title_english}</p>
						<h3>Studio</h3>
						<p>{this.props.show.studio[0].studio_name}</p>
						<h3>Synopsis</h3>
						<p>{this.parseDescription(this.props.show.description)}</p>
						<h3>External Links</h3>
						{externalLinks}
					</div>
				</div>
		);
	},

	parseDescription: function (string) {
		while (string.includes("<br>")) {
			string = string.replace("<br>","");
		}
		return string;
	},

	trackThisShow: function () {
		this.props.trackShow(this.props.show.id)
	},

	untrackThisShow: function () {
		this.props.untrackShow(this.props.show.id)
	},

	parseTime: function (date) {

		let time = new Date(date);

		const days = [
			"Sun",
			"Mon",
			"Tues",
			"Wed",
			"Thur",
			"Fri",
			"Sat"
		]

		let amPm = " AM";

		let timeString = days[time.getDay()] + " ";

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
	}
});

module.exports = Showpane;