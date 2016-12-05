var React = require("react");
var ReactRouter = require("react-router");
var userStore = require("../stores/userStore.js");

var Link = require("react-router").Link;

var Login = require("./Login.jsx");
var Register = require("./Register.jsx");

var LoginModal = React.createClass({
	getInitialState: function () {
		return {
			class: "modal",
			display: "login"
		}
	},

	render: function () {

		var login;
		var register;


		if (this.state.display === "login") {
			login = <Login switch={this.handleSwitch}/>;
		} else {
			register = <Register switch={this.handleSwitch}/>
		}


		return (
			<div className={this.state.class}>
				<div className="modal-wrapper log">
					<button className="close-modal log fa fa-times" onClick={this.props.closeModal}></button>
					{login}
					{register}
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
	},

	handleSwitch: function () {
		this.setState({
			display: "register"
		})
	}
});

module.exports = LoginModal;