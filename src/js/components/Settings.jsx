var React = require("react");
var ReactRouter = require("react-router");



var Settings = React.createClass({
	componentWillMount: function () {
		this.requireAuth();
	},

	requireAuth: function () {
		ReactRouter.hashHistory.push("/Login");
	},

	render: function () {
		return (
			<div></div>
		);
	}
});

module.exports = Settings;