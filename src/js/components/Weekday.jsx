var React = require("react");
var Show = require("./Show.jsx")


var Weekday = React.createClass({
	

	render: function () {
		var schedule;
		schedule = this.props.shows.map(function (show) {
			return <Show key={show.id} show={show}/>;
		})
		return (
			<div className="weekday">
				<h3>{this.props.day}</h3>
				{schedule}
			</div>
		);
	}
});

module.exports = Weekday;