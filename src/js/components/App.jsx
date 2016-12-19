var React = require("react");

var Nav = require("./Nav.jsx");
var userStore = require("../stores/userStore.js");

var App = React.createClass({

	// Only run once on page load
 	componentWillMount() {
 		// Check for active user session and set if needed
		if (userStore.getLocalSession() && !userStore.getUser().isAuth) {
			userStore.noLandingModal();
			userStore.setSession();

		// Else set user as pseudo
		} else if (!userStore.getUser().isAuth) {
			userStore.pseudo();
			if (userStore.getUser().tracking.length > 0) {
				userStore.noLandingModal();
			}
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