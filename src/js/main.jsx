// 1. Error checking Password characters
// -- Refactor searchPane to display search results as Weekday components
// -- Active class for account-tabs in Landing
// 2. Write tests for password field clearing
// 4. Handle Auth token refreshing timer
// 5. Use Anilist for everything, poll tvdb when you need descriptions?
// 6. User time zone in settings
// 7. Link to external site in Anime descriptions
// 8. Mailchimp 
// 9. db is converting ids to strings for some reason
// -- Test time parser
// -- Password hashing
// -- Make sessions more secure

// send this : 

// {
//   "apikey": "1205F191EB0365DE",
//   "username": "nehima99",
//   "userkey": "308E1AE189D54C27"
// }

// Text notifications : test text on signup 

// Wishful thinking: Basic functionality is available when not logged in 
//					 Generating iCal file
// Cookies look doable


var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var App = require("./components/App.jsx");
var Index = require("./components/Index.jsx");
var Landing = require("./components/Landing.jsx");
var Login = require("./components/Login.jsx");
var Register = require("./components/Register.jsx");
var Home = require("./components/Home.jsx");
var Settings = require("./components/Settings.jsx");


var jsx = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="landing" component={Landing}>
				<IndexRoute component={Register} />
				<Route path="login" component={Login} />
			</Route>
			<Route path="/settings" component={Settings} />
		</Route>
	</Router>
);

ReactDOM.render(jsx, document.querySelector("#app"));