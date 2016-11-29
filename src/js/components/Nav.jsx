var React = require("react");

var Link = require("react-router").Link;
var userStore = require("../stores/userStore.js")

var Nav = React.createClass({
	render: function () {
		var links;
		if (userStore.isAuth()) {
			links = (
				<ul>
					<li className="logo"><Link to="/home"></Link></li>
					<li className="settings fa fa-cog"><Link to="/Settings">Settings</Link></li>
					<li className="user-status"><Link to="/Logout">Logout</Link></li>
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
	}
});

module.exports = Nav;