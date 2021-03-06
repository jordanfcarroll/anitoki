var React = require("react");
var userStore = require("../stores/userStore");	

var SearchResult = require("./SearchResult.jsx");
var PaneWeeklyView = require("./PaneWeeklyView.jsx");
var Weekday = require("./Weekday.jsx");
var Link = require("react-router").Link;
var Popup = require("./Popup.jsx")

var ReactTransitionGroup = require('react-addons-transition-group');


var Searchpane = React.createClass({
	getInitialState: function () {
		return {
			searchText: "",
			displayTracking: false,
			popup: true
		};
	},

	render: function () {
		var _this = this;

		// Placeholder for display that holds shows
		var display;
		// Placeholder for determining which days should be shown
		var hasResults = false;
		// Placeholder for search field
		var input;
		// Placeholder for X button in search field
		var button;
		var popup;

		var airingButtonClass = "";
		var trackingButtonClass = "";

		if (this.props.drawerSide === "airing") {
			airingButtonClass = "active-toggle"
		} else {
			trackingButtonClass = "active-toggle"
		}


		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		];

		if (!this.props.shows) {
			display = <div className="show-loading-message">Loading shows...</div>;


		} else if (this.props.drawerSide === "following") {
			display = <PaneWeeklyView 
						shows={this.props.shows} 
						userShows={this.props.userShows} />
			input = <div />;


		} else {
			input = (<input 
						className="search"
						type="text"
						value={this.state.searchText}
						onChange={this.handleChange}
						onKeyDown={this.handleSearch} />
					);


			// Placeholder for filtered weekdays containing search filtered shows
			display = [];

			for (var i = 0; i < 7; i++) {
				// Variable to hold all jsx for a given day
				var day;

				// Filter all shows whose airtime match that day
				let shows = this.props.shows.filter(function (show) {
					var date = new Date(show.airing.time);
					return (date.getDay() === i);
				})

				// Filter again for shows that match the search criteria
				shows = shows.filter(function (show) {
					return (show.title_romaji.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0 || 
						show.title_english.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0)
				})

				// Convert filtered shows into SearchResult components
				let results = shows.map(function (show) {
					let isTracking = false;
					if (_this.props.userShows.indexOf(show.id) >= 0) {
						isTracking = true;
					}
					return (
							<SearchResult 
								key={show.id} 
								show={show} 
								onChoose={_this.addTracking} 
								onDeChoose={_this.removeTracking} 
								isTracking={isTracking}
								setShow={_this.props.setShow}/>
					)
				})

				// Fill day with jsx if there were show results for that day
				if (shows[0]) {
					hasResults = true;
					day = (
						<div className="list-weekly-day" key={i}>
							<h3>{days[i]}</h3>
							{results}
						</div>
					);	
				} else {
					day = <div></div>
				}

				// Push day to display
				display.push(day);

			}
			
			if (!hasResults) {
				display = <div className="no-results-found">No Results Found</div>;
			}

			if (this.state.searchText.length > 0) {
				// Make an X button
				button = <i className="fa fa-times" onClick={this.clearSearch} />
			}  else {
				// Or a search icon
				button = <i className="fa fa-search" />
			}

			if (this.state.popup && !userStore.getUser().email && this.props.drawerStatus === "open") {
				popup = <Popup handlePopupClose={this.handlePopupClose} navigateToRegister={this.props.navigateToRegister}/>;
			}
		}

		return (
			<div className="list-panel">
				<div className="list-toggle-buttons">
					<button 
						className={"tracking-toggle " + trackingButtonClass} 
						onClick={this.props.followingDrawerSwitch}>Following</button>
					<button 
						className={"airing-toggle " + airingButtonClass}
						onClick={this.props.airingDrawerSwitch}>Airing</button>
					<div className="search-wrapper">
						{input}
						{button}
					</div>
				</div>
				<div className="list-week-wrapper">
					{display}
					<ReactTransitionGroup>
						{popup}
					</ReactTransitionGroup>
				</div>
			</div>
		);
	},

	handleChange: function (event) {
		this.setState({
			searchText: event.target.value
		});
	},

	addTracking: function (id) {
		userStore.track(id);
	},

	removeTracking: function (id) {
		userStore.untrack(id);
	},

	clearSearch: function () {
		this.setState({
			searchText: "",
			airingButtonClass: "active-toggle",
			trackingButtonClass: ""
		});
	},

	displayTracking: function () {
		this.props.followingDrawerSwitch();
		this.setState({
			trackingButtonClass: "active-toggle",
			airingButtonClass: ""
		});
		this.props.unsetShow();
	},

	handlePopupClose: function () {
		this.setState({
			popup: false
		})
	}
});

module.exports = Searchpane;