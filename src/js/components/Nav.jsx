var React = require("react");

var Link = require("react-router").Link;
var userStore = require("../stores/userStore.js")

var Nav = React.createClass({
	getInitialState: function () {
		return {
			hasListener : false,
			auth: userStore.getUser()
		}
	},

	componentWillMount: function () {
		var _this = this;
	
	},

	componentDidMount: function() {
		// After mount and first render, set to true
		this.setState({
			hasListener: true
		})
	},

	render: function () {
		var _this = this;
		var links;

		// hack to ensure listeners do not get deleted by react router (???) and duplicates are not created
		if (!this.state.hasListener) {
			userStore.on("update", function () {
				_this.setState({
					auth: userStore.getUser()
				})
			})

		}
	
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
		userStore.off("update");
	},

	handleLogOut: function () {
		userStore.logOut();
	}
});

module.exports = Nav;