var React = require("react");
var ReactRouter = require("react-router");



var Settings = React.createClass({
	render: function () {
		return (
			<div>
				<div>
					<h3>Settings</h3>
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
				</div>
				<div>
					<h4>Notifications</h4>
					<input type="radio" name="notifications" value="none"/><label htmlFor="None">None</label>
					<input type="radio" name="notifications" value="none"/><label htmlFor="Text Only">Text Only</label>
					<input type="radio" name="notifications" value="none"/><label htmlFor="Email Only">Email Only</label>
					<input type="radio" name="notifications" value="none"/><label htmlFor="Text and Email">Text and Email</label>
					<button>Save Changes</button>
					<input 
						type="text"
						placeholder="Phone" />
					<h4>Showtime Display</h4>
					<input type="radio" name="showtimes" value="showtimenone" /><label htmlFor="showtimenone">None</label>
					<input type="radio" name="showtimes" value="Countdown" /><label htmlFor="Countdown">Countdown</label>
					<button onClick={this.saveNotifications}>Save Changes</button>
				</div>
			</div>
		);
	}, 

	saveNotifications: function () {
		
	}
});

module.exports = Settings;