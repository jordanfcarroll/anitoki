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
		schedule = this.props.shows.map(function (show) {
			return <Show 
						key={"weekdisplay" + show.id}
						show={show}
						showtime={_this.props.showtime} 
						timeSinceUpdate={_this.state.timeSinceUpdate}/>;
		})
		return (
			<div className={this.props.className}>
				<div className="nav-hint">
					<i className="fa fa-angle-left nav-hint icon-l" />
					<h5>swipe to view more days</h5>
					<i className="fa fa-angle-right nav-hint icon-r" />
				</div>
				<h2>{this.props.day}</h2>
				{noShowsMessage}
				{schedule}
			</div>
		);
	},

	navigateToDrawer: function () {
		this.props.navigateToDrawer();
	}
});

module.exports = Weekday;