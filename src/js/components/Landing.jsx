var React = require("react");



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
					<button className="account-tab">Sign Up</button>
					<button className="account-tab">Log In</button>
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = Landing;