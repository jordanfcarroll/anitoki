var React = require("react");
var userStore = require("../stores/userStore.js");

var SearchResult = React.createClass({
	getInitialState: function () {
		return {
			isTracking: userStore.isTracking(this.props.show.id)
		}
	},

	componentWillMount: function () {
		var _this = this;
		userStore.on("update", function () {
			_this.setState({
				isTracking: userStore.isTracking(_this.props.show.id)
			})
		})
	},

	render: function () {
		var button;
		if(this.state.isTracking) {
			button = <button onClick={this.untrackThisShow}>Untrack</button>
		} else {
			button = <button onClick={this.trackThisShow}>Track</button>
		}
		return (
			<li>
				<h3 onClick={this.handleClick}>{this.props.show.title_romaji}</h3>
				{button}
			</li>
			);
	},

	trackThisShow: function () {
		this.props.onChoose(this.props.show.id);
	},

	untrackThisShow: function () {
		this.props.onDeChoose(this.props.show.id);
	},

	handleClick: function () {
		this.props.setShow(this.props.show.id);
	}
});

module.exports = SearchResult;