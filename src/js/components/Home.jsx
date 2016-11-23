var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore");	

var Home = React.createClass({
	componentWillMount: function () {
		if (!userStore.isAuth()) {
			ReactRouter.hashHistory.push("/landing");
		}
	},

	render: function () {
		return (
			<div></div>
		);
	}
});

module.exports = Home;