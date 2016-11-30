var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore.js");

var Link = require("react-router").Link;



var Landing = React.createClass({
	componentWillMount: function () {
		if (userStore.isAuth()) {
			ReactRouter.hashHistory.push("/home");
		}
	},
	
	render: function () {
		return (
			<div className="about-wrapper">
				<h2 className="about-header">Never Miss an Episode</h2>
				<h3 className="flav-txt">anitoki is the best way to keep track of all the anime that's currently airing</h3>
				<div className="about-img-wrapper"></div>
				<div className="account-wrapper">
					<button 
						className="account-tab"
						onClick={this.navigateRegister}>Sign Up</button>
					<button 
						className="account-tab"
						onClick={this.navigateLogin}>Log In</button>
					{this.props.children}
				</div>
			</div>
		);
	},

	navigateLogin: function () {
		ReactRouter.hashHistory.push("/landing/login");
	},

	navigateRegister: function () {
		ReactRouter.hashHistory.push("/landing/register");
	}
});

module.exports = Landing;