var React = require("react");

var Link = require("react-router").Link;
var userStore = require("../stores/userStore.js")

var Nav = React.createClass({
	getInitialState: function () {
		console.log("Getting Nav State");
		return {
			auth: userStore.getUser()
		}
	},

	componentWillMount: function () {
		console.log("Nav will mount")
		var _this = this;
	
	},

	render: function () {
		var _this = this;
		var links;

		// Remove residual listeners created from previous renders
		userStore.off("update");

		// Create the single listener
		userStore.on("update", function () {
			console.log("Updating Nav State");
			_this.setState({
				auth: userStore.getUser()
			})
		})
		if (this.state.auth.email) {
			links = (
				<ul>
					<li className="logo"><Link to="/home"></Link></li>
					<li className="settings fa fa-cog"><Link to="/Settings">Settings</Link></li>
					<li className="user-status" onClick={this.handleLogOut}>Logout</li>
				</ul>
			)
		} else {
			links = (
				<ul>
					<li className="logo"><Link to="/home"></Link></li>
					<li className="user-status"><Link to="/landing/login">Login</Link></li>
				</ul>
			)
		}
		return (
			<nav>
				{links}
			</nav>
		);
	},

	componentWillUnMount: function () {
		console.log("Nav Is Unmounting");
		userStore.off("update");
	},

	handleLogOut: function () {
		userStore.logOut();
	}
});

module.exports = Nav;