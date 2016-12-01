var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore");	
var showStore = require("../stores/showStore");	

var Searchpane = require("./Searchpane.jsx");
var Showpane = require("./Showpane.jsx");
var WeeklyView = require("./WeeklyView.jsx");

var Home = React.createClass({
	getInitialState: function () {
		return {
			shows: showStore.pollForUpdate(),
			userShows: null,
			showDetails: null
		}
	},

	componentWillMount: function () {
		var _this = this;

		// Check for active user session 
		if (userStore.getLocalSession()) {
			userStore.setSession();

		} else if (!userStore.getUser()) {
			// Set user as pseudo
			userStore.pseudo();
		}


		this.setState({
			userShows: userStore.getTracking()
		})

		// Pull new shows when necessary
		showStore.on("update", function() {
			_this.setState({
				shows: showStore.getShows()
			})
		})

		// Pull user's tracked shows when updated
		userStore.on("update", function() {
			_this.setState({
				userShows: userStore.getTracking()
			})
		})
	},

	render: function () {
		var searchpane;
		if (this.state.showDetails) {
			searchpane = <Showpane show={this.state.showDetails} />
		}
		return (
			<div>
				<WeeklyView 
					shows={this.state.shows} 
					userShows={this.state.userShows}/>
				<div>
					{searchpane}
					<Searchpane 
						shows={this.state.shows} 
						userShows={this.state.userShows}
						setShow={this.setShow} />
				</div>
			</div>
		);
	},

	componentWillUnmount: function () {
		var _this = this;
		showStore.off("update");
		userStore.off("update");
	},

	setShow: function (id) {
		console.log(id);
		this.setState({
			showDetails: showStore.getObj()[String(id)]
		})
	}
});

module.exports = Home;