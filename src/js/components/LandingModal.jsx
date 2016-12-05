var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore.js");

var Link = require("react-router").Link;

var LandingModal = React.createClass({
	getInitialState: function () {
		return {
			class: "modal"
		}
	},

	render: function () {
		return (
			<div className={this.state.class}>
				<div className="modal-wrapper">
					<button 
						className="close-modal fa fa-times"
						onClick={this.handleClose}></button>
					<div className="about-img">
						<h2>Never Miss an Episode</h2>
						<h4>anitoki is the best way to keep track of all the anime that's currently airing</h4>
					</div>
					<button className="modal-search" onClick={this.props.navigateToDrawer}>SEARCH SHOWS</button>
					<div className="signup-txt">
						<p>Want to know when a new episode is out?
						<span onClick={this.props.navigateToRegister}> Make an account </span>
						to receive notifications!</p>
					</div>
				</div>
			</div>
		);
	},

	componentDidMount: function () {
		this.setState({
			class: "modal fade-in"
		})
	},

	handleClose: function () {
		this.props.closeModal();
	}
});

module.exports = LandingModal;