var React = require("react");
var ReactRouter = require("react-router");

var userStore = require("../stores/userStore.js")


var Settings = React.createClass({
	getInitialState: function () {
		return {
			settings: userStore.getSettings()
		}
	},



	render: function () {
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
					</div>
				</div>
				<div className="notif-wrapper">
					<h4>Preferences</h4>
					<h5>Notifications</h5>
					<div className="radio-wrapper">
						<input className="custom-radio" type="radio" name="notifications" value="none" id="None"/>
						<label htmlFor="None">None</label>
					</div>
					<div className="radio-wrapper">
						<input className="custom-radio" type="radio" name="notifications" value="none" id="Text Only"/>
						<label htmlFor="Text Only">Text</label>
					</div>
					{/*
					<input type="radio" name="notifications" value="none"/><label htmlFor="Email Only">Email Only</label>
					<input type="radio" name="notifications" value="none"/><label htmlFor="Text and Email">Text and Email</label>
					*/}
					<button className="settings-button">Save Changes</button>
					<input 
						type="text"
						placeholder="Phone" />
					<h5>Showtime Display</h5>
					<div className="radio-wrapper">
						<input className="custom-radio" type="radio" name="showtimes" value="showtimenone" id="showtimenone" />
						<label htmlFor="showtimenone">None</label>
					</div>
					<div className="radio-wrapper">
						<input className="custom-radio" type="radio" name="showtimes" value="Countdown" id="Countdown" />
						<label htmlFor="Countdown">Countdown</label>
					</div>
					<button className="settings-button" onClick={this.saveNotifications}>Save Changes</button>
				</div>
			</div>
		);
	}, 

	saveNotifications: function () {
	}
});

module.exports = Settings;