var React = require("react");
var Show = require("./Show.jsx")
var showStore = require("../stores/showStore");
var userStore = require("../stores/userStore");

var Weekday = React.createClass({
	
	getInitialState: function () {
		return {
			timeSinceUpdate: showStore.getTime()
		}
	},

	componentWillMount: function () {
		var _this = this;
		showStore.on("timeupdate", function () {
			_this.setState({
				timeSinceUpdate: showStore.getTime()
			})
		})

	},

	render: function () {
		var _this = this;
		var sorted;
		var schedule;
		var noShowsMessage;


		if (this.props.shows.length < 1) {
			noShowsMessage = (
					<div className="no-shows">
						<h3>No Shows Found</h3>
						<button className="find-shows" onClick={this.navigateToDrawer}>Find some now!</button>
					</div>
				)
		}	
		sorted = this.props.shows.sort(function (a, b) {
					  if (a.airing.countdown > b.airing.countdown) {
					    return 1;
					  }
					  if (a.airing.countdown < b.airing.countdown) {
					    return -1;
					  }
					  // a must be equal to b
					  return 0;
					});

		schedule = sorted.map(function (show) {
			return <Show 
						key={"weekdisplay" + show.id}
						show={show}
						showtime={_this.props.showtime} 
						timeSinceUpdate={_this.state.timeSinceUpdate}/>;
		})
		return (
			<div className={this.props.className}>
				<h2>{this.props.day}</h2>
				{noShowsMessage}
				{schedule}
			</div>
		);
	},

	componentWillUnmount: function () {
		showStore.off("timeupdate");
	},

	navigateToDrawer: function () {
		this.props.navigateToDrawer();
	}
});

module.exports = Weekday;