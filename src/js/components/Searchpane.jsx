var React = require("react");
var userStore = require("../stores/userStore");	

var SearchResult = require("./SearchResult.jsx")
var Weekday = require("./Weekday.jsx")

var Searchpane = React.createClass({
	getInitialState: function () {
		return {
			searchText: "",
			displayWeekly: false
		}
	},

	render: function () {
		var _this = this;
		var results;
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"
		]
		// If search text has been inputed, should display search results instead of airing view
		if (this.props.shows && this.state.searchText !== "") {
			var filtered = this.props.shows.filter(function(show) {
				if (show.title_romaji.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0 || 
					show.title_english.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0) {
					return true;
				} else {
					return false;
				}
			})
			results = filtered.map(function (show) {
				return <SearchResult 
						key={show.id} 
						show={show} 
						onChoose={_this.addTracking} 
						onDeChoose={_this.removeTracking} 
						isTracking={userStore.isTracking(show.id)}/>
			})

			// If there is no search text, should default to showing all shows with days of the week
		} else if (this.props.shows && this.state.searchText === "") {
			results = [];
			for (var i = 0; i < 7; i++) {
				if (this.props.shows) {
					var shows = this.props.shows.filter(function (show) {
						var date = new Date(show.airing.time);
						return (date.getDay() === i);
					})
				}
				results.push(<Weekday className="search-day" day={days[i]} key={i} shows={shows}/>)
			}
		}


		return (
			<div>
				<button>Currently Tracking</button>
				<button onClick={this.clearSearch}>Currently Airing</button>
				<ul>
					{results}
				</ul>
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
		})
	},

	addTracking: function (id) {
		userStore.track(id);
	},

	removeTracking: function (id) {
		userStore.untrack(id);
	},

	clearSearch: function () {
		this.setState({
			searchText: ""
		})
	}
});

module.exports = Searchpane;