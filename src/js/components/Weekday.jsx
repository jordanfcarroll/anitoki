var React = require("react");
var Show = require("./Show.jsx")
var showStore = require("../stores/showStore");

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
						<button className="find-shows">Find some now!</button>
					</div>
				)
		}	
		schedule = this.props.shows.map(function (show) {
			return <Show 
						key={show.id}
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
	}
});

module.exports = Weekday;