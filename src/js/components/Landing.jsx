var React = require("react");



var Landing = React.createClass({
	render: function () {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
});

module.exports = Landing;