var React = require("react");
var Show = require("./Show.jsx")
var showStore = require("../stores/showStore");
var userStore = require("../stores/userStore");

var PaneWeekday = React.createClass({

	render: function () {
		var _this = this;
		var schedule;
		var collapsed = "";

		if (this.props.shows.length === 0) {
			collapsed = " collapsed"
		}


		schedule = this.props.shows.map(function (show) {
			return <Show 
						key={"weekdisplay" + show.id}
						show={show}
						showtime={_this.props.showtime} />;
		})
		return (
			<div className={this.props.className + collapsed}>
				<h2>{this.props.day}</h2>
				{schedule}
			</div>
		);
	}

});

module.exports = PaneWeekday;