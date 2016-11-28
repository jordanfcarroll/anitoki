var React = require("react");
var ReactRouter = require("react-router");



var Index = React.createClass({
	componentWillMount: function () {
		if (userStore.isAuth()) {
			ReactRouter.hashHistory.push("/home");
		} else {
			ReactRouter.hashHistory.push("/landing");
		}
	},
	
	render: function () {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Index;