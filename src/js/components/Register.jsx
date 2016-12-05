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
		let emailBorderClass = "";
		let passwordBorderClass = "";

		if (this.state.emailError.length > 0) {
			emailBorderClass = " red-border"
		}

		if (this.state.passwordError.length > 0) {
			passwordBorderClass = " red-border"
		}



		return (
			<div>
				<div className="new-email-wrapper">
					<input 
						type="text" 
						className={"text-input email-input" + emailBorderClass} 
						placeholder="Email"
						onChange={this.emailChange} 
						onKeyDown={this.keySubmit} 
						value={this.state.emailText} />

					<span className="error-msg">{this.state.emailError}</span>
				</div>
				<div className="new-pw-wrapper">
					<input 
						className={"text-input password-input" + passwordBorderClass}
						placeholder="Password"
						type="password" 
						onChange={this.passwordChange} 
						onKeyDown={this.keySubmit} 
						value={this.state.passwordText}/>

					<span className="error-msg">{this.state.passwordError}</span>
					<input 
						className={"text-input password-confirm" + passwordBorderClass} 
						placeholder="Confirm Password"
						type="password" 
						onChange={this.passwordConfirmChange} 
						onKeyDown={this.keySubmit} 
						value={this.state.passwordConfirmText}/>

					<span>{this.state.passwordConfirmError}</span>
				</div>
				<button className="submit" onClick={this.handleSubmit}>Submit</button>
			</div>
		);
	},

	// Allow fields to accept input

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


	// Handle form submission

	handleSubmit: function () {
		this.setState({
			emailError: "",
			passwordError: "",
			passwordConfirmError: ""
		})
		if(!this.hasErrors()) {
			userStore.register(this.state.emailText, this.state.passwordText);
		} 
	},

	keySubmit: function (event) {
		if (event.keyCode === 13) {
			this.handleSubmit();
		}
	},


	// Check for all errors, setting state upon encountering, and returning true if none are thrown

	hasErrors: function () {

		let hasErrors = false;

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


		// Check that password length is appropriate
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