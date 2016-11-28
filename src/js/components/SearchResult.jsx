var React = require("react");

var SearchResult = React.createClass({
	
	render: function () {
		return (
			<li>
				<p>{this.props.show.title_romaji}</p>
				<button>Here's some text for Rannah to think about later</button>
			</li>
			);
	}
});

module.exports = SearchResult;