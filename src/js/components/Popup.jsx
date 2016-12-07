var React = require("react");
var Link = require("react-router").Link;
var findDOMNode = require("react-dom").findDOMNode;
var Tweenmax = require("gsap").Tweenmax;

var Popup = React.createClass({

	componentWillEnter: function (callback) {
		const el = findDOMNode(this);
    	TweenMax.fromTo(el, 1.4, {opacity: 0}, {opacity: 1, delay: 2, onComplete: callback});
	},

	render: function () {
		return (
				<div>
					<div className="list-bumper"></div>
						<div className="popup">
							<button onClick={this.props.handlePopupClose} className="fa fa-times popup-close" />
							<p>Want to know when a new episode is out?
							<br />
								<Link onClick={this.props.navigateToRegister}>Make an account</Link>
								to receive notifications!</p>
						</div>
				</div>
		);
	}
});

module.exports = Popup;