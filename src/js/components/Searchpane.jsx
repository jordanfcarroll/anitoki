var React = require("react");
var userStore = require("../stores/userStore");	

var SearchResult = require("./SearchResult.jsx");
var WeeklyView = require("./WeeklyView.jsx");
var Weekday = require("./Weekday.jsx");

var Searchpane = React.createClass({
	getInitialState: function () {
		return {
			searchText: "",
			displayTracking: false
		};
	},

	render: function () {
		var _this = this;
		var display;
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
			display = <WeeklyView 
						shows={this.props.shows} 
						userShows={this.props.userShows} />;
		} else {
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
						<div>
							<SearchResult 
								key={show.id} 
								show={show} 
								onChoose={_this.addTracking} 
								onDeChoose={_this.removeTracking} 
								isTracking={userStore.isTracking(show.id)}/>
						</div>
					)
				})

				// Fill day with jsx if there were show results for that day
				if (shows[0]) {
					day = (
						<div>
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
		}


		// If search text has been inputed, should display search results instead of airing view
		// if (this.props.shows && this.state.searchText !== "") {
			// var filtered = this.props.shows.filter(function(show) {
			// 	if (show.title_romaji.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0 || 
			// 		show.title_english.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0) {
			// 		return true;
			// 	} else {
			// 		return false;
			// 	}
			// })
		// 	results = filtered.map(function (show) {
		// 		return <SearchResult 
		// 				key={show.id} 
		// 				show={show} 
		// 				onChoose={_this.addTracking} 
		// 				onDeChoose={_this.removeTracking} 
		// 				isTracking={userStore.isTracking(show.id)}/>
		// 	})

		// 	// If there is no search text, should default to showing all shows with days of the week
		// } else if (this.props.shows && this.state.searchText === "") {
		// 	results = [];
		// 	for (var i = 0; i < 7; i++) {
		// 		if (this.props.shows) {
		// 			var shows = this.props.shows.filter(function (show) {
		// 				var date = new Date(show.airing.time);
		// 				return (date.getDay() === i);
		// 			})
		// 		}
		// 		results.push(<Weekday className="search-day" day={days[i]} key={i} shows={shows}/>)
		// 	}
		// }


		return (
			<div>
				<button onClick={this.displayTracking}>Currently Tracking</button>
				<button onClick={this.clearSearch}>Currently Airing</button>
				{display}
				<input 
					type="text"
					value={this.state.searchText}
					onChange={this.handleChange}
					onKeyDown={this.handleSearch} />
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
			displayTracking: false	
		});
	},

	displayTracking: function () {
		this.setState({
			displayTracking: true
		});
	}
});

module.exports = Searchpane;