var React = require("react");
var userStore = require("../stores/userStore.js")


var Register = React.createClass({
	getInitialState: function () {
		return {
			emailText: "",
			passwordText: "",
			passwordConfirmText: ""
		}
	},

	render: function () {
		return (
			<div>
				<input type="text" onChange={this.emailChange} value={this.state.emailText} />
				<input type="password" onChange={this.passwordChange} value={this.state.passwordText}/>
				<input type="password" onChange={this.passwordConfirmChange} value={this.state.passwordConfirmText}/>
				<button>Submit</button>
			</div>
		);
	},

	emailChange: function (event) {
		this.setState({
			emailText: event.target.value
		})
	},

	passwordChange: function (event) {
		this.setState({
			passwordText: event.target.value
		})
	},

	passwordConfirmChange: function (event) {
		this.setState({
			passwordConfirmText: event.target.value
		})
	}
});

module.exports = Register;