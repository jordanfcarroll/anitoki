var React = require("react");
var Link = require("react-router").Link;

var Nav = require("./Nav.jsx");
var userStore = require("../stores/userStore.js");


// function getActiveClass (path) {
// 	var current = window.location.hash.slice(1);
// 	return current === path ? "active" : "";
// }

var App = React.createClass({
	componentWillMount: function () {
		userStore.on("update", function () {
			console.log("userStore has updated");
		});
		if (userStore.getLocalSession() && !userStore.getUser()) {
			userStore.setSession();

		} else if (!userStore.getUser()) {
			// Set user as pseudo
			userStore.pseudo();
		}
	},

	render: function () {

		return (
			<div>
				<Nav />
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
});

module.exports = App;