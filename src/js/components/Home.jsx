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
			shows: showStore.pollForUpdate()	
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
	},

	render: function () {
		var searchpane = <div>Waiting for data...</div>;
		if (this.state.shows) {
			searchpane = <Searchpane shows={this.state.shows} />;
		}
		return (
			<div>
				<WeeklyView />
				<Showpane />
				<div>
					{searchpane}
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