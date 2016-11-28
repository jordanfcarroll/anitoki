var React = require("react");
var userStore = require("../stores/userStore.js")

var Login = React.createClass({
	getInitialState: function () {
		return {
			emailText: "",
			passwordText: "",
			emailError: "",
			passwordError: ""
		}
	},

	componentWillMount: function () {
		var _this = this;
		userStore.on("error", function () {
			var errors = userStore.getErrors();
			_this.setState({
				emailError: errors.emailError,
				passwordError: errors.passwordError,
				passwordText: ""
			})
		})
	},


	render: function () {
		return (
			<div>
				<input 
					onKeyDown={this.keySubmit} 
					type="text" 
					value={this.state.emailText} 
					onChange={this.emailChange}/>
				<p>{this.state.emailError}</p>
				<input 
					onKeyDown={this.keySubmit} 
					type="password" 
					value={this.state.passwordText} 
					onChange={this.passwordChange}/>
				<p>{this.state.passwordError}</p>
				<button onClick={this.handleSubmit}>Submit</button>
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

	handleSubmit: function () {
		userStore.logIn(this.state.emailText, this.state.passwordText);
	},

	keySubmit: function (event) {
		if (event.keyCode === 13) {
			this.handleSubmit();
		}
	}


});

module.exports = Login;