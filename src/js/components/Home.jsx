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
			userShows: userStore.getTracking(),
			showDetails: null,
			drawerStatus: false
		}
	},



	componentWillMount: function () {
		var _this = this;

		// Pull new shows when necessary
		showStore.on("update", function() {
			_this.setState({
				shows: showStore.getShows()
			});
		})

		// Pull user's tracked shows when updated
		userStore.on("update", function() {
			_this.setState({
				userShows: userStore.getTracking()
			})
		})
	},



	render: function () {
		var showpane;
		var drawerButton;

		// If show has been clicked, display showpane for details
		if (this.state.showDetails) {
			showpane = <Showpane show={this.state.showDetails} unsetShow={this.unsetShow} />
		}



		// Drawer toggle states
		if (this.state.drawerStatus === "open") {
			drawerButton = (
				<div className="list-panel-toggle" onClick={this.toggleDrawer}>
					<i className="fa fa-angle-down list-up" />
					<h5>Hide List View</h5>
				</div>
				);
		} else {
			drawerButton = (
				<div className="list-panel-toggle" onClick={this.toggleDrawer}>
					<i className="fa fa-angle-up list-up" />
					<h5>Show List View</h5>
				</div>
				);
		}



		return (
			<div>
				<WeeklyView 
					shows={this.state.shows} 
					userShows={this.state.userShows}/>
				<div id="drawer">
					{drawerButton}
					<div className={"drawer-body " + this.state.drawerStatus}>
						{showpane}
						<Searchpane 
							shows={this.state.shows} 
							userShows={this.state.userShows}
							setShow={this.setShow} />
					</div>
				</div>
			</div>
		);
	},



	componentWillUnmount: function () {
		showStore.off("update");
		userStore.off("update");
	},

	setShow: function (id) {
		// On show click, set details to be displayed in showpane
		this.setState({
			showDetails: showStore.getObj()[String(id)]
		})
	},

	unsetShow: function () {
		this.setState({
			showDetails: null
		})
	},

	toggleDrawer: function () {
		if (this.state.drawerStatus === "open") {
			this.setState({
				drawerStatus: "closed"
			});
		} else {
			this.setState({
				drawerStatus: "open"
			});
		}
	}
});

module.exports = Home;