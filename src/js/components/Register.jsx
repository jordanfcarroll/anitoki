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
		var emailError;
		var passwordError;


		let emailBorderClass = "";
		let passwordBorderClass = "";



		if (this.state.emailError.length > 0) {
			emailError = <span className="error-msg">{this.state.emailError}</span>
			emailBorderClass = " red-border"
		}

		if (this.state.passwordError.length > 0) {
			passwordError = <span className="error-msg">{this.state.passwordError}</span>
			passwordBorderClass = " red-border"
		}



		return (
			<div>
				<h2>Sign Up</h2>
				<h4>
					Already have an account? 
					<span className="sign-in-spn" onClick={this.props.switch}> Sign in here! </span>
				</h4>
				<div className="new-email-wrapper">
					<input 
						type="text" 
						className={"text-input email-input" + emailBorderClass} 
						placeholder="Email"
						onChange={this.emailChange} 
						onKeyDown={this.keySubmit} 
						value={this.state.emailText} />
					{emailError}
				</div>
				<div className="new-pw-wrapper">
					<input 
						className={"text-input password-input" + passwordBorderClass}
						placeholder="Password"
						type="password" 
						onChange={this.passwordChange} 
						onKeyDown={this.keySubmit} 
						value={this.state.passwordText}/>

					{passwordError}
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
			userStore.register(this.state.emailText, this.state.passwordText, this.props.closeModal, this.props.permitSlideLeave);
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
		var str = this.state.emailText;
		var patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		var patt =  patt.test(str);
		console.log(patt);

		// Check email field for errors
		if (!patt) {
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