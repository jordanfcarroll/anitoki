var React = require("react");

var Showpane = React.createClass({


	render: function () {
		var externalLinks;
		var button;

		if (this.props.show.external_links) {
			externalLinks = this.props.show.external_links.map(function (value) {
				return (
					<div>
						<a target="_blank" href={value.url}>{value.site}</a>
					</div>
					);
			})
		}

		if(this.props.isTracking) {
			button = <button className="follow-toggle unfollow" onClick={this.untrackThisShow}>Unfollow</button>
		} else {
			button = <button className="follow-toggle" onClick={this.trackThisShow}>Follow</button>
		}



		return (
			<div className="showpane">
				<button className="fa fa-times close-show" onClick={this.props.unsetShow}></button>
				<img src={this.props.show.image_url_lge} />
				<div className="show-aag">
					<h3>{this.props.show.title_romaji}</h3>
					<p>Next episode: ... </p>
					{button}
				</div>
				<div className="show-info">
					<h3>English Title</h3>
					<p>{this.props.show.title_english}</p>
					<h3>Studio</h3>
					<p>{this.props.show.studio[0].studio_name}</p>
					<h3>Synopsis</h3>
					<p>{this.parseDescription(this.props.show.description)}</p>
					<h3>External Links</h3>
					{externalLinks}
				</div>
			</div>
		);
	},

	parseDescription: function (string) {
		while (string.includes("<br>")) {
			string = string.replace("<br>","");
		}
		return string;
	},

	trackThisShow: function () {
		this.props.trackShow(this.props.show.id)
	},

	untrackThisShow: function () {
		this.props.untrackShow(this.props.show.id)
	}
});

module.exports = Showpane;