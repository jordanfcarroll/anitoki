var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore.js");

var findDOMNode = require("react-dom").findDOMNode;
var Tweenmax = require("gsap").Tweenmax;

var Link = require("react-router").Link;

var Login = require("./Login.jsx");
var Register = require("./Register.jsx");

var LoginModal = React.createClass({
	getInitialState: function () {
		return {
			display: this.props.display
		}
	},

	componentWillEnter: function (callback) {
		const el = findDOMNode(this);
    	TweenMax.fromTo(el, .3, {opacity: 0}, {opacity: 1, onComplete: callback});
	},

	render: function () {

		var login;
		var register;


		if (this.state.display === "register") {
			register = <Register switch={this.handleSwitch} closeModal={this.props.closeModal}/>
		} else {
			login = <Login switch={this.handleSwitch} closeModal={this.props.closeModal}/>;
		}


		return (
			<div className="modal">
				<div className="modal-wrapper log">
					<button className="close-modal log fa fa-times" onClick={this.props.closeModal}></button>
					{login}
					{register}
				</div>
			</div>
		);
	},

	componentWillLeave: function (callback) {
		const el = findDOMNode(this);
    	TweenMax.fromTo(el, .3, {opacity: 1}, {opacity: 0, onComplete: callback});
	},

	handleClose: function () {
		this.props.closeModal();
	},

	handleSwitch: function () {
		if (this.state.display !== "register") {
			this.setState({
				display: "register"
			})
		} else {
			this.setState({
				display: "login"
			})
		}
	}
});

module.exports = LoginModal;