var React = require("react");

var Showpane = React.createClass({


	render: function () {
		return (
			<div className="showpane">
				<button className="fa fa-times close-show" onClick={this.props.unsetShow}></button>
				<img src={this.props.show.image_url_lge} />
				<div className="show-aag">
					<h3>{this.props.show.title_romaji}</h3>
					<p>Next episode: ... </p>
					<button className="follow-toggle">Follow</button>
				</div>
				<div className="show-info">
					<h3>Studio</h3>
					<p>{this.props.show.studio[0].studio_name}</p>
					<h3>English Title</h3>
					<p>{this.props.show.title_english}</p>
					<h3>Synopsis</h3>
					<p>{this.props.show.description}</p>
				</div>
			</div>
		);
	}
});

module.exports = Showpane;