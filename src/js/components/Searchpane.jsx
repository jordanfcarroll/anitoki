var React = require("react");
var userStore = require("../stores/userStore");	

var Searchpane = React.createClass({


	render: function () {
		return (
			<div>
				<input 
					type="text"
					onKey={this.handleSearch} />
				<div>
					
				</div>
			</div>
		);
	},

	handleSearch: function () {
		// Search function
	}
});

module.exports = Searchpane;