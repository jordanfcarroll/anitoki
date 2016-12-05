var React = require("react");
var Link = require("react-router").Link;


var Login = React.createClass({
	getInitialState: function () {
		return {
			class: "popup "
		}
	},

	render: function () {
		return (
			<div>
				<div className="list-bumper"></div>
					<div className={this.state.class}>
						<button onClick={this.props.handlePopupClose} className="fa fa-times popup-close" />
						<p>Want to know when a new episode is out?
						<br />
							<Link to="landing/register">Make an account</Link>
							to receive notifications!</p>
				</div>
			</div>
		);
	},

	componentDidMount: function () {
		this.setState({
			class: this.state.class += "fade-in-popup "
		})
	}
});

module.exports = Login;