var React = require("react");
var ReactRouter = require("react-router");

var userStore = require("../stores/userStore.js")


var Settings = React.createClass({
	getInitialState: function () {
		return {
			emailText: userStore.getUser().email,
			passwordText: "",
			passwordConfirmText: "",
			emailError: "",
			passwordError: "",
			passwordConfirmError: "",
			selectedNotifications: userStore.getSettings().notifications,
			selectedShowtimes: userStore.getSettings().showtime,
			phone: userStore.getSettings().phone,
			phoneError: "",
			emailMessage: "",
			showtimeMessage: "",
			notifMessage: "",
		}
	},

	componentWillMount: function () {
		var _this = this;
		userStore.on("settingsupdate", function () {
			_this.setState({
				emailMessage: userStore.getMessages().emailMessage,
				showtimeMessage: userStore.getMessages().showtimeMessage,
				notifMessage: userStore.getMessages().notifMessage
			});
		});

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
		// Placeholder for phone input
		var phone;
		var emailError;
		var passwordError;

		if (this.state.emailError.length > 0) {
			emailError = <span className="error-msg">{this.state.emailError}</span>
		}

		if (this.state.passwordError.length > 0) {
			passwordError = <span className="error-msg">{this.state.passwordError}</span>
		}


		if (this.state.selectedNotifications === "text") {
			phone = (<input 
						type="text"
						placeholder="Phone : 123-123-1234"
						value={this.state.phone}
						onChange={this.onPhoneChange} />
					);
		}

		return (
			<div className="settings-wrapper">
				<div>
					<h3>Settings</h3>
					<div className="user-info-wrapper">
						<h4>User Info</h4>
						<input 
							type="text"
							placeholder="Email"
							onChange={this.handleEmailChange}
							value={this.state.emailText} />
						{emailError}
						<input 
							type="password"
							placeholder="New Password"
							onChange={this.handlePasswordChange}
							value={this.state.passwordText} />
						{passwordError}
						<input 
							type="password"
							placeholder="Confirm New Password"
							onChange={this.handlePasswordConfirmChange} 
							value={this.state.passwordConfirmText}/>
						<button className="settings-button" onClick={this.saveEmail}>Save Changes</button>
						<p>{this.state.emailMessage}</p>
					</div>
				</div>
				<div className="notif-wrapper">
					<h4>Preferences</h4>
					<h5>Notifications</h5>
					<div className="radio-wrapper">
						<input 
							className="custom-radio" 
							type="radio" 
							name="notifications" 
							value="none" 
							id="None"
							onChange={this.handleNotifChange}
							checked={this.state.selectedNotifications === "none"}/>
						<label htmlFor="None">None</label>
					</div>
					<div className="radio-wrapper">
						<input 
							className="custom-radio" 
							type="radio" 
							name="notifications" 
							value="text" 
							id="Text Only"
							onChange={this.handleNotifChange}
							checked={this.state.selectedNotifications === "text"}/>
						<label htmlFor="Text Only">Text</label>
					</div>
					{/*
					<input type="radio" name="notifications" value="none"/><label htmlFor="Email Only">Email Only</label>
					<input type="radio" name="notifications" value="none"/><label htmlFor="Text and Email">Text and Email</label>
					*/}
					{phone}
					<p>{this.state.phoneError}</p>
					<button className="settings-button" onClick={this.saveNotifications}>Save Changes</button>
					<p>{this.state.notifMessage}</p>
					<h5>Showtime Display</h5>
					<div className="radio-wrapper">
						<input 
							className="custom-radio" 
							type="radio" 
							name="showtimes" 
							value="showtime" 
							id="showtimenone"
							onChange={this.handleShowtimeChange}
							checked={this.state.selectedShowtimes === "showtime"} />
						<label htmlFor="showtimenone">Airing Time</label>
					</div>
					<div className="radio-wrapper">
						<input 
							className="custom-radio" 
							type="radio" 
							name="showtimes" 
							value="countdown" 
							id="Countdown"
							onChange={this.handleShowtimeChange}
							checked={this.state.selectedShowtimes === "countdown"} />
						<label htmlFor="Countdown">Countdown</label>
					</div>
					<button className="settings-button" onClick={this.saveShowtimes}>Save Changes</button>
					<p>{this.state.showtimeMessage}</p>
				</div>
			</div>
		);
	}, 

	componentWillUnmount: function () {
		userStore.off("error");
	},

	handleEmailChange: function (e) {
		this.setState({
			emailText: e.target.value
		})
	},

	handlePasswordChange: function (e) {
		this.setState({
			passwordText: e.target.value
		})
	},

	handlePasswordConfirmChange: function (e) {
		this.setState({
			passwordConfirmText: e.target.value
		})
	},

	saveEmail: function () {
		this.setState({
			emailError: "",
			passwordError: "",
			passwordConfirmError: ""
		})
		if(!this.hasErrors()) {
			userStore.updateEmail(this.state.emailText, this.state.passwordText, this.updateSuccess);
		} 
	},

	updateSuccess: function () {
		console.log("clearing");
		this.setState({
			passwordText: "",
			passwordConfirmText: "",
			emailMessage: "Updated!"
		})
	},

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
	},

	handleNotifChange: function (e) {
		this.setState({
			selectedNotifications: e.target.value
		})
	},

	handleShowtimeChange: function (e) {
		this.setState({
			selectedShowtimes: e.target.value
		})
	},

	onPhoneChange: function (e) {
		this.setState({
			phone: e.target.value
		})
	},

	saveNotifications: function () {
		if (this.state.selectedNotifications === "none") {
			userStore.updateNotificationSettings({
				phone: null,
				notifications: this.state.selectedNotifications
			})
		} else if (!this.hasPhoneErrors()) {

			userStore.updateNotificationSettings({
				notifications: this.state.selectedNotifications,
				phone: this.parsePhone(this.state.phone)
			});

		}
	},

	saveShowtimes: function () {
		userStore.updateShowtimeSettings(this.state.selectedShowtimes);
	},

	parsePhone: function (string) {
		let parsed = string;
		while(parsed.indexOf("-") >= 0) {
			parsed = parsed.replace("-","")	;
		}
		return parsed;
	},

	hasPhoneErrors: function () {

		let phone = this.parsePhone(this.state.phone)

		let hasErrors = false;
		this.setState({
			phoneError: ""
		})



		if (phone.length !== 10) {
			this.setState({
				phoneError: "Please enter a ten-digit phone number"
			})
			hasErrors = true;
		}



		let phoneHasBadChar = phone.split("")
								.every(function (value) {
									return !("0123456789".indexOf(value) >= 0 ) 
								});

		if (phoneHasBadChar) {
			this.setState({
				phoneError: "Please enter a valid phone number"
			})
			hasErrors = true;
		}


		return hasErrors;
	},

	// clearPhoneField: function () {
	// 	this.setState({
	// 		phone: ""
	// 	})
	// }
});

module.exports = Settings;