var React = require("react");

var Link = require("react-router").Link;
var userStore = require("../stores/userStore.js")

var Nav = React.createClass({
	render: function () {
		var links;
		if (userStore.isAuth()) {
			links = (
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/Settings">Settings</Link></li>
					<li><Link to="/Logout">Logout</Link></li>
				</ul>
			)
		} else {
			links = (
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/landing/login">Login</Link></li>
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