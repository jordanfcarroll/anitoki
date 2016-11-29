var React = require("react");
var userStore = require("../stores/userStore");	

var SearchResult = require("./SearchResult.jsx")

var Searchpane = React.createClass({
	getInitialState: function () {
		return {
			searchText: ""
		}
	},

	render: function () {
		var _this = this;
		var results;
		var trackingButton;

		if (this.props.shows) {
			var filtered = this.props.shows.filter(function(show) {
				if (show.title_romaji.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0 || 
					show.title_english.toUpperCase().indexOf(_this.state.searchText.toUpperCase()) >= 0) {
					return true;
				} else {
					return false;
				}
			})
			results = filtered.map(function (show) {
				// Check whether the show is being tracked, to determine which button should be displayed
				// var isTracking = false;
				// if (userStore.getUser().tracking.indexOf(show.id) !== -1) {
				// 	isTracking = true;
				// } 
				return <SearchResult 
						key={show.id} 
						show={show} 
						onChoose={_this.addTracking} 
						onDeChoose={_this.removeTracking} 
						isTracking={userStore.isTracking(show.id)}/>
			})
		}


		return (
			<div>
				<input 
					type="text"
					value={this.state.searchText}
					onChange={this.handleChange}
					onKeyDown={this.handleSearch} />
				<ul>
					{results}
				</ul>
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
	}
});

module.exports = Searchpane;