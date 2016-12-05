var React = require("react");
var userStore = require("../stores/userStore");	

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