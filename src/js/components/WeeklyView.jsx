var React = require("react");

var Weekday = require("./Weekday.jsx");

var WeeklyView = React.createClass({
	getInitialState: function () {
		return {
			mobileDisplaying: 0
		}
	},

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
			let className = "weekly-day"
			if (this.props.shows) {
				shows = this.props.userShows.map(function (id) {
					return _this.props.shows.find((value) => id === value.id)
				})
				shows = shows.filter(function (show) {
					var date = new Date(show.airing.time);
					return (date.getDay() === i);
				})
			}
			if (this.state.mobileDisplaying === i) {
				className += " mobile-current-displaying";
			}
			weekdays.push(<Weekday className={className} day={days[i]} key={i} shows={shows}/>)
		}

		// Create mobile view buttons 
		var buttonLeft;
		var buttonRight;

		if (this.state.mobileDisplaying > 0) {
			buttonLeft = <button className="back-button" onClick={this.handleBack} />
		}
		if (this.state.mobileDisplaying < 6) {
			buttonRight = <button className="forward-button" onClick={this.handleAdvance} />
		}


		return (
			<div id="week-view">
				{buttonLeft}
				{weekdays}
				{buttonRight}
			</div>
		);
	},

	handleAdvance: function () {
		var _this = this;
		if(this.state.mobileDisplaying < 6) {
			this.setState({
				mobileDisplaying: _this.state.mobileDisplaying + 1
			})
		}
	},

	handleBack: function () {
		var _this = this;
		if(this.state.mobileDisplaying > 0) {
			this.setState({
				mobileDisplaying: _this.state.mobileDisplaying - 1
			})
		}
	}
});

module.exports = WeeklyView;