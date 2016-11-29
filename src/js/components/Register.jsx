var React = require("react");
var ReactRouter = require("react-router");


var userStore = require("../stores/userStore.js")


var Register = React.createClass({
	getInitialState: function () {
		return {
			emailText: "",
			passwordText: "",
			passwordConfirmText: "",
			emailError: "",
			passwordError: "",
			passwordConfirmError: ""
		}
	},

	componentWillMount: function () {
		var _this = this;
		userStore.on("error", function () {
			var errors = userStore.getErrors();
			_this.setState({
				emailError: errors.emailError,
				passwordError: errors.passwordError,
				passwordText: "",
				passwordConfirmText: ""
			})
		})
	},

	render: function () {
		return (
			<div>
				<input type="text" 
					className="text-input email-input" 
					onChange={this.emailChange} 
					onKeyDown={this.keySubmit} 
					value={this.state.emailText} />
				<span>{this.state.emailError}</span>
				<input 
					className="text-input password-input" 
					type="password" 
					onChange={this.passwordChange} 
					onKeyDown={this.keySubmit} 
					value={this.state.passwordText}/>
				<span>{this.state.passwordError}</span>
				<input 
					className="text-input password-confirm" 
					type="password" 
					onChange={this.passwordConfirmChange} 
					onKeyDown={this.keySubmit} 
					value={this.state.passwordConfirmText}/>
				<span>{this.state.passwordConfirmError}</span>
				<button className="submit" onClick={this.handleSubmit}>Submit</button>
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
	},

	handleSubmit: function () {
		this.setState({
			emailError: "",
			passwordError: "",
			passwordConfirmError: ""
		})
		if(!this.hasErrors()) {
			userStore.register(this.state.emailText, this.state.passwordText);
			// userStore.getErrors();
		} 
	},

	keySubmit: function (event) {
		if (event.keyCode === 13) {
			this.handleSubmit();
		}
	},

	hasErrors: function () {
		var hasErrors = false;
		// Check email field for errors
		if(this.state.emailText.indexOf("@") === -1) {
			this.setState({
				emailError: "Please enter a valid email"
			})
			hasErrors = true;
		}
		if (this.state.emailText.indexOf(".") === -1) {
			this.setState({
				emailError: "Please enter a valid email"
			})
			hasErrors = true;
		}

		// Check password fields for errors
		if (this.state.passwordText !== this.state.passwordConfirmText) {
			this.setState({
				passwordError: "Passwords do not match"
			})
			hasErrors = true;
		}

		if (this.state.passwordText.length < 8) {
			this.setState({
				passwordError: "Password must contain at least 8 characters"
			})
			hasErrors = true;
		}

		return hasErrors;
	}
});

module.exports = Register;