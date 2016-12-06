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
			display: this.props.display
		}
	},

	render: function () {

		var login;
		var register;


		if (this.state.display === "register") {
			register = <Register switch={this.handleSwitch} closeModal={this.props.closeModal}/>
		} else {
			login = <Login switch={this.handleSwitch} closeModal={this.props.closeModal}/>;
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
		if (this.state.display === "login") {
			this.setState({
				display: "register"
			})
		} else {
			this.setState({
				display: "login"
			})
		}
	}
});

module.exports = LoginModal;