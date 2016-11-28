var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore");	
var showStore = require("../stores/showStore");	

var Searchpane = require("./Searchpane.jsx");
var Showpane = require("./Showpane.jsx");
var WeeklyView = require("./WeeklyView.jsx");

var Home = React.createClass({
	componentWillMount: function () {
		if (!userStore.isAuth()) {
			ReactRouter.hashHistory.push("/landing");
		}
	},

	render: function () {
		return (
			<div>
				<WeeklyView />
				<Showpane />
				<Searchpane />
			</div>
		);
	}
});

module.exports = Home;