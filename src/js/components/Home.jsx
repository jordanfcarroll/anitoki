var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore");	
var showStore = require("../stores/showStore");	

var ReactTransitionGroup = require('react-addons-transition-group');

var Searchpane = require("./Searchpane.jsx");
var Showpane = require("./Showpane.jsx");
var WeeklyView = require("./WeeklyView.jsx");

var LandingModal = require("./LandingModal.jsx");
var LoginModal = require("./LoginModal.jsx");

var Home = React.createClass({
	getInitialState: function () {
		return {
			shows: showStore.pollForUpdate(),
			userShows: userStore.getTracking(),
			showDetails: null,
			drawerStatus: "closed",
			settings: userStore.getSettings(),
			displayLandingModal: userStore.getLandingModal(),
			displayLoginModal: false
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

		showStore.on("detailsupdate", function () {
			_this.setState({
				showDetails: showStore.getShowDetails()
			})
		})

		// Pull user's tracked shows when updated
		userStore.on("update", function() {
			_this.setState({
				userShows: userStore.getTracking(),
				settings: userStore.getSettings()
			})
		})

		userStore.on("modalupdate", function () {
			_this.setState({
				displayLoginModal: userStore.getLoginModal()
			})
		})

	},



	render: function () {
		var landingModal;
		var loginModal;

		var showpane;
		var drawerButton;

		// if first visit, display landingmodal
		if (this.state.displayLandingModal) {
			landingModal = <LandingModal 
							closeModal={this.closeLandingModal}
							navigateToDrawer={this.navigateToDrawer}
							navigateToRegister={this.navigateToRegister}/>;
		}

		if (this.state.displayLoginModal) {
			loginModal = <LoginModal 
							closeModal={this.closeLoginModal}
							display={this.state.displayLoginModal}/>
		}



		// If show has been clicked, display showpane for details
		if (this.state.showDetails) {
			let isTracking = false;
			var _this = this;
			let details = this.state.showDetails.find((value) => (value.id === _this.state.displayingDetails));

			if (this.state.userShows.indexOf(details.id) >= 0) {
				isTracking = true;
			}

			showpane = (	
						<div className="showpane-wrapper">
							<ReactTransitionGroup>
								<Showpane 
									show={details} 
									unsetShow={this.unsetShow} 
									isTracking={isTracking}
									trackShow={this.track}
									untrackShow={this.untrack}/>
							</ReactTransitionGroup>
						</div>
						);
		}


		// Drawer toggle states
		if (this.state.drawerStatus === "open") {
			drawerButton = (
				<div className="list-panel-toggle" onClick={this.toggleDrawer}>
					<i className="fa fa-angle-down list-up" />
				</div>
				);
		} else {
			drawerButton = (
				<div className="list-panel-toggle" onClick={this.toggleDrawer}>
					<i className="fa fa-angle-up list-up" />
				</div>
				);
		}



		return (
			<div>
				<ReactTransitionGroup>
					{landingModal}
				</ReactTransitionGroup>
				<ReactTransitionGroup>
					{loginModal}
				</ReactTransitionGroup>
				<WeeklyView 
					shows={this.state.shows} 
					userShows={this.state.userShows}
					showtime={this.state.settings.showtime}
					navigateToDrawer={this.navigateToDrawer}/>
				<div id="drawer">
					{drawerButton}
					<div className={"drawer-body " + this.state.drawerStatus}>
						{showpane}
						<Searchpane 
							shows={this.state.shows} 
							userShows={this.state.userShows}
							setShow={this.setShow}
							unsetShow={this.unsetShow}
							drawerStatus={this.state.drawerStatus} 
							navigateToRegister={this.navigateToRegister}/>
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
			showDetails: showStore.fetchShowDetails(id),
			displayingDetails: id
		})

	},

	unsetShow: function () {
		this.setState({
			showDetails: null,
			displayingDetails: null
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
	},

	closeLandingModal: function () {
		userStore.noLandingModal();
		this.setState({
			displayLandingModal: false
		})
	},

	closeLoginModal: function () {
		this.setState({
			displayLoginModal: false
		})
	},

	navigateToDrawer: function () {
		this.setState({
			displayLandingModal: false,
			drawerStatus: "open"
		})
	},

	navigateToRegister: function () {
		this.setState({
			drawerStatus: "closed",
			displayLoginModal: "register"
		})
	},

	track: function (id) {
		userStore.track(id);
	},

	untrack: function (id) {
		userStore.untrack(id);
	}
});

module.exports = Home;