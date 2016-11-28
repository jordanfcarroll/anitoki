var React = require("react");

var SearchResult = React.createClass({
	
	render: function () {
		return (
			<li>
				<p>{this.props.show.title_romaji}</p>
				<button onClick={this.trackThisShow}>Here's some text for Rannah to think about later</button>
			</li>
			);
	},

	trackThisShow: function () {
		this.props.onChoose(this.props.show.id);
	}
});

module.exports = SearchResult;