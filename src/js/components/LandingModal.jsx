var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore.js");

var Link = require("react-router").Link;

var LandingModal = React.createClass({

	render: function () {
		return (
			<div className="modal">
				<div className="about-img">
					<h2>Never Miss an Episode</h2>
					<h4>anitoki is the best way to keep track of all the anime that's currently airing</h4>
				</div>
				<button className="modal-search">SEARCH SHOWS</button>
				<div className="signup-txt">
					<p>Want to know when a new episode is out?
					<span> Make an account </span>
					to receive notifications!</p>
				</div>
			</div>
		);
	}
});

module.exports = LandingModal;