var React = require("react");
var ReactRouter = require("react-router");



var Show = React.createClass({

	render: function () {
		return (
			<div>
				<p>{this.props.show.title_romaji}</p>
			</div>
		);
	}
});

module.exports = Show;