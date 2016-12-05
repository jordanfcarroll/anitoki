var React = require("react");
var ReactRouter = require("react-router");

var userStore = require("../stores/userStore.js")


var Settings = React.createClass({
	getInitialState: function () {
		return {
			selectedNotifications: userStore.getSettings().notifications,
			selectedShowtimes: userStore.getSettings().showtime,
			phone: "",
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
		})
	},



	render: function () {
		// Placeholder for phone input
		var phone;

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
							placeholder="Email"/>
						<input 
							type="text"
							placeholder="New Password"/>
						<input 
							type="text"
							placeholder="Confirm New Password"/>
						<button className="settings-button">Save Changes</button>
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

	handleEmailSubmit: function () {

	},

	saveNotifications: function () {
		if (this.state.selectedNotifications === "none") {
			userStore.updateNotificationSettings({
				phone: null,
				notifications: this.state.selectedNotifications
			})
		} else if (!this.hasPhoneErrors()) {

			this.setState({
				phone: ""
			})


			userStore.updateNotificationSettings({
				notifications: this.state.selectedNotifications,
				phone: this.parsePhone(this.state.phone)});
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
									return (!"0123456789".indexOf(value) >= 0 ) 
								});
		if (phoneHasBadChar) {
			this.setState({
				phoneError: "Please enter a valid phone number"
			})
			hasErrors = true;
		}


		return hasErrors;
	}
});

module.exports = Settings;