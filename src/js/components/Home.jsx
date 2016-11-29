var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore");	
var showStore = require("../stores/showStore");	

var Searchpane = require("./Searchpane.jsx");
var Showpane = require("./Showpane.jsx");
var WeeklyView = require("./WeeklyView.jsx");

var Home = React.createClass({
	getInitialState: function () {
		return {
			shows: showStore.pollForUpdate(),
			userShows: userStore.getTracking()
		}
	},

	componentWillMount: function () {
		var _this = this;
		if (!userStore.isAuth()) {
			ReactRouter.hashHistory.push("/landing");
		}
		showStore.on("update", function() {
			_this.setState({
				shows: showStore.getShows()
			})
		})
		userStore.on("update", function() {
			_this.setState({
				userShows: userStore.getTracking()
			})
		})
	},

	render: function () {
		return (
			<div>
				<WeeklyView shows={this.state.shows} userShows={this.state.userShows} />
				<div>
					<Showpane />
					<Searchpane shows={this.state.shows} userShows={this.state.userShows} />
				</div>
			</div>
		);
	},

	componentWillUnmount: function () {
		var _this = this;
		showStore.removeListener("update", function() {
			_this.setState({
				shows: showStore.getShows()
			})
		})
	}
});

module.exports = Home;