var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore.js");

var findDOMNode = require("react-dom").findDOMNode;
var Tweenmax = require("gsap").Tweenmax;

var Link = require("react-router").Link;

var LandingModal = React.createClass({
	componentWillAppear: function (callback) {
		const el = findDOMNode(this);
		console.log(el);
    	TweenMax.fromTo(el, .3, {opacity: 0}, {opacity: 1, onComplete: callback});
	},

	render: function () {
		return (
			<div className="modal" onKeyDown={this.handleKey}>
				<div className="modal-wrapper">
					<button 
						className="close-modal fa fa-times"
						onClick={this.handleClose}></button>
					<div className="about-img">
						<h2>Never Miss an Episode</h2>
						<h4>anitoki is the best way to keep track of all the anime that's currently airing</h4>
					</div>
					<button className="modal-search" onClick={this.props.navigateToDrawer}>SEARCH SHOWS</button>
					<div className="signup-txt">
						<p>Want to know when a new episode is out?
						<span onClick={this.navigateToRegister}> Make an account </span>
						to receive notifications!</p>
					</div>
				</div>
			</div>
		);
	},	

	navigateToRegister: function () {
		this.props.closeModal();
		this.props.navigateToRegister();
	},

	componentWillLeave: function (callback) {
		const el = findDOMNode(this);
    	TweenMax.fromTo(el, .3, {opacity: 1}, {opacity: 0, onComplete: callback});
	},

	handleClose: function () {
		this.props.closeModal();
	}
});

module.exports = LandingModal;