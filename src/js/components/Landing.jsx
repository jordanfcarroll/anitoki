var React = require("react");



var Landing = React.createClass({
	componentWillMount: function () {
		if (userStore.isAuth()) {
			ReactRouter.hashHistory.push("/home");
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

module.exports = Landing;