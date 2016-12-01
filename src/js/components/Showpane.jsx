var React = require("react");
var userStore = require("../stores/userStore");	

var Showpane = React.createClass({


	render: function () {
		return (
			<div>
				<button onClick={this.props.unsetShow}>X</button>
				<img src={this.props.show.image_url_lge} />
				<h3>{this.props.show.title_romaji}</h3>
				<p>Next episode: ... </p>
				<button>Follow</button>
				<div>
					<h3>English Title</h3>
					<p>{this.props.show.title_english}</p>
					<h3>Synopsis</h3>
					<p>Synopsis goes here at some point</p>
				</div>
			</div>
		);
	}
});

module.exports = Showpane;