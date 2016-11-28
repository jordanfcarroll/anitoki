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
		// showStore.on("update", function() {
		// 	_this.setState({
		// 		shows: showStore.getShows()
		// 	})
		// })
	},

	render: function () {
		return (
			<div>
				<WeeklyView />
				<Showpane />
				<Searchpane shows={[]}/>
			</div>
		);
	}
});

module.exports = Home;