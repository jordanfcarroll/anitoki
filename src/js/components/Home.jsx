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
			showDetails: null
		}
	},

	componentWillMount: function () {
		var _this = this;
		// if (!userStore.isAuth()) {
		// 	ReactRouter.hashHistory.push("/landing");
		// }
		showStore.on("update", function() {
			_this.setState({
				shows: showStore.getShows()
			})
		})
		userStore.on("update", function() {
			_this.setState({
				userShows: userStore.getTracking()
			})
		})
	},

	render: function () {
		var searchpane;
		if (this.state.showDetails) {
			searchpane = <Showpane show={this.state.showDetails} />
		}
		return (
			<div>
				<WeeklyView 
					shows={this.state.shows} 
					userShows={this.state.userShows}/>
				<div>
					{searchpane}
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
		showStore.removeListener("update", function() {
			_this.setState({
				shows: showStore.getShows()
			})
		})
	},

	setShow: function (id) {
		console.log(id);
		this.setState({
			showDetails: showStore.getObj()[String(id)]
		})
	}
});

module.exports = Home;