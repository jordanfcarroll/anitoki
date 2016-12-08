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
		let emailBorderClass = "";
		let passwordBorderClass = "";

		var emailError;
		var passwordError;

		if (this.state.emailError.length > 0) {
			emailError = <span className="error-msg">{this.state.emailError}</span>;
			emailBorderClass = " red-border"
		}

		if (this.state.passwordError.length > 0) {
			passwordError = <span className="error-msg">{this.state.passwordError}</span>;
			passwordBorderClass = " red-border"
		}


		return (
			<div>
				<h2>Login</h2>
				<h4>Don't have an account? <span className="sign-up-spn" onClick={this.props.switch}> Sign Up </span> to track your favorite shows and receive notifications!</h4>
				<div className="email-wrapper">
					<input
						className={"text-input email-input" + emailBorderClass} 
						placeholder="Email"
						onKeyDown={this.keySubmit} 
						type="text" 
						value={this.state.emailText} 
						onChange={this.emailChange}/>
					{emailError}
				</div>
				<div className="pw-wrapper">
					<input 
						className={"text-input password-input" + passwordBorderClass} 
						placeholder="Password"
						onKeyDown={this.keySubmit} 
						type="password" 
						value={this.state.passwordText} 
						onChange={this.passwordChange}/>
					{passwordError}
				</div>
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

	handleSubmit: function () {
		this.setState({
			emailError: "",
			passwordError: "",
			passwordConfirmError: ""
		});
		
		if (!this.hasErrors()) {
			userStore.logIn(this.state.emailText, this.state.passwordText, this.props.closeModal, this.props.permitSlideLeave);
		}
	},

	hasErrors: function () {
		let hasErrors = false;


		if (this.state.emailText.length === 0) {
			hasErrors = true;
			this.setState({
				emailError: "Please enter an email"
			})
		} else if (this.state.passwordText.length === 0) {
			hasErrors = true;
			this.setState({
				passwordError: "Please enter a password"
			})
		} 
		return hasErrors;
	},

	keySubmit: function (event) {
		if (event.keyCode === 13) {
			this.handleSubmit();
		}
	}


});

module.exports = Login;