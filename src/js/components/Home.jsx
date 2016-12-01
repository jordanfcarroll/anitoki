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
			showDetails: null,
			drawerIsExpanded: false
		}
	},

	componentWillMount: function () {
		var _this = this;


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
		var showpane;
		var drawerButton;
		if (this.state.showDetails) {
			showpane = <Showpane show={this.state.showDetails} />
		}

		if (this.state.drawerIsExpanded) {
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
				<div>
					{drawerButton}
					{showpane}
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
	},

	toggleDrawer: function () {
		this.setState({
			drawerIsExpanded: !this.state.drawerIsExpanded
		})
	}
});

module.exports = Home;