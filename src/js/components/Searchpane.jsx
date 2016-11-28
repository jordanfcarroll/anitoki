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


		var filtered = this.props.shows.filter(function(show) {
			if (show.title_romaji.indexOf(_this.state.searchText) >= 0) {
				return true;
			} else {
				return false;
			}
		})
		results = filtered.map(function (show) {
			return <SearchResult key={show.id} show={show} />
		})


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

	handleSearch: function () {
		// Search function
	}
});

module.exports = Searchpane;