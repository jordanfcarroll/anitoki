var React = require("react");

var Nav = require("./Nav.jsx");
var userStore = require("../stores/userStore.js");


// function getActiveClass (path) {
// 	var current = window.location.hash.slice(1);
// 	return current === path ? "active" : "";
// }

var App = React.createClass({

	// Only run once on page load
 	componentWillMount() {
 		// Check for active user session and set if needed
		if (userStore.getLocalSession() && !userStore.getUser().isAuth) {
			userStore.setSession();

		// Else set user as pseudo
		} else if (!userStore.getUser().isAuth) {
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