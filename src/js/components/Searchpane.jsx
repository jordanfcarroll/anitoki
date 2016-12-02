var React = require("react");
var userStore = require("../stores/userStore");	

var SearchResult = require("./SearchResult.jsx");
var PaneWeeklyView = require("./PaneWeeklyView.jsx");
var Weekday = require("./Weekday.jsx");
var Link = require("react-router").Link;

var Searchpane = React.createClass({
	getInitialState: function () {
		return {
			searchText: "",
			displayTracking: false,
			airingButtonClass: "active-toggle",
			trackingButtonClass: "",
			popup: true
		};
	},

	render: function () {
		var _this = this;

		// Placeholder for display that holds shows
		var display;
		var hasResults = false;
		var input;

		// Placeholder for X button in search field
		var button;

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

			display = <p>Loading shows...</p>;

		} else if (this.state.displayTracking) {
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
							)


			// Add shows that match searchText to jsx for weekday and append those to display jsx
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
					return (
							<SearchResult 
								key={show.id} 
								show={show} 
								onChoose={_this.addTracking} 
								onDeChoose={_this.removeTracking} 
								isTracking={userStore.isTracking(show.id)}
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

			if (this.state.popup && !userStore.getUser().email) {
				var popup = (
					<div>
						<div className="list-bumper"></div>
						<div className="popup">
							<button onClick={this.handlePopupClose} className="fa fa-times popup-close" />
							<p>Want to know when a new episode is out?
							<br />
								<Link to="landing/register">Make an account</Link>
								to receive notifications!</p>
						</div>
					</div>	
					);
			}
		}

		return (
			<div className="list-panel">
				<div className="list-toggle-buttons">
					<button 
						className={"tracking-toggle " + this.state.trackingButtonClass} 
						onClick={this.displayTracking}>Following</button>
					<button 
						className={"airing-toggle " + this.state.airingButtonClass}
						onClick={this.clearSearch}>Airing</button>
					<div className="search-wrapper">
						{input}
						{button}
					</div>
				</div>
				<div className="list-week-wrapper">
					{display}
					{popup}
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
			displayTracking: false,
			airingButtonClass: "active-toggle",
			trackingButtonClass: ""
		});
	},

	displayTracking: function () {
		this.setState({
			displayTracking: true,
			trackingButtonClass: "active-toggle",
			airingButtonClass: ""
		});
	},

	handlePopupClose: function () {
		this.setState({
			popup: false
		})
	}
});

module.exports = Searchpane;