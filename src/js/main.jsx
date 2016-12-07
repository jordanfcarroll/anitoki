// -- Active class for account-tabs in Landing
// 2. Write tests for password field clearing
// 4. Handle Auth token refreshing timer
// 5. Use Anilist for everything, poll tvdb when you need descriptions?
// 7. Link to external site in Anime descriptions
// 8. Mailchimp 
// 9. db is converting ids to strings for some reason
// - showpane artifacts on following tab
// -- Buttons?

// -- Artificial delay and success message for login/register


// send this : 

// {
//   "apikey": "1205F191EB0365DE",
//   "username": "nehima99",
//   "userkey": "308E1AE189D54C27"
// }

// Text notifications : test text on signup 

// Wishful thinking: 
//					 Generating iCal file
//					Better phone input


var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");

var Swipe = require("swipe-js");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var App = require("./components/App.jsx");
var Home = require("./components/Home.jsx");
var Settings = require("./components/Settings.jsx");


var jsx = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/settings" component={Settings} />
		</Route>
	</Router>
);

ReactDOM.render(jsx, document.querySelector("#app"));





