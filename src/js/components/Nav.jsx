var React = require("react");

var Link = require("react-router").Link;
var userStore = require("../stores/userStore.js");

var Nav = React.createClass({
	getInitialState: function () {
		return {
			auth: userStore.getUser().isAuth
		}
	},

	render: function () {
		var _this = this;
		var links;

		// hack to ensure listeners do not get deleted by react router (???) and duplicates are not created
		userStore.once("update", function () {
			_this.setState({
				auth: userStore.getUser().isAuth
			})
		})	
	
		// Psuedo users have email of null, so are not considered authenticated for nav display 
		if (this.state.auth) {
			links = (
				<ul>
					<li className="logo"><Link to="/"></Link></li>
					<li className="settings fa fa-cog"><Link to="/settings"></Link></li>
					<li className="user-status" onClick={this.handleLogOut}>Logout</li>
				</ul>
			)
		} else {
			links = (
				<ul>
					<li className="logo"><Link to="/"></Link></li>
					<li className="user-status" onClick={this.navigateLogin}>Login</li>
				</ul>
			)
		}
		return (
			<header>
				<nav>
					{links}
				</nav>
			</header>
		);
	},

	componentWillUnMount: function () {
		userStore.off("update");
	},

	handleLogOut: function () {
		userStore.logOut();
	},

	navigateLogin: function () {
		userStore.yesLoginModal();
	}
});

module.exports = Nav;