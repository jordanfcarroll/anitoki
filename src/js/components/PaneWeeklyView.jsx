var React = require("react");

var PaneWeekday = require("./PaneWeekday.jsx");

var PaneWeeklyView = React.createClass({
	render: function () {
		var _this = this;
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		]
		var weekdays = [];
		for (var i = 0; i < 7; i++) {
			let shows = [];
			if (this.props.shows) {
				shows = this.props.userShows.map(function (id) {
					return _this.props.shows.find((value) => id === value.id)
				})
				shows = shows.filter(function (show) {
					var date = new Date(show.airing.time);
					return (date.getDay() === i);
				})
			}

			weekdays.push(<PaneWeekday className="weekly-day" day={days[i]} key={i} shows={shows}/>)
		}


		return (
			<div id="week-view">
				<div className="weekday-wrapper">
					{weekdays}
				</div>
			</div>
		);
	}
});

module.exports = PaneWeeklyView;