var React = require("react");
var userStore = require("../stores/userStore.js")

var Login = React.createClass({
	getInitialState: function () {
		return {
			emailText: "",
			passwordText: ""
		}
	},


	render: function () {
		return (
			<div>
				<input type="text" value={this.state.emailText} onChange={this.emailChange}/>
				<input type="password" value={this.state.passwordText} onChange={this.passwordChange}/>
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
	}


});

module.exports = Login;