// 1. Error checking for Login/Register


// Text notifications : test text on signup 

// Wishful thinking: Basic functionality is available when not logged in 
// Cookies look doable


var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var App = require("./components/App.jsx");
var Landing = require("./components/Landing.jsx");
var Login = require("./components/Login.jsx");
var Register = require("./components/Register.jsx");
var Home = require("./components/Home.jsx");
var Settings = require("./components/Settings.jsx");


var jsx = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<Route path="landing" component={Landing}>
				<IndexRoute component={Register} />
				<Route path="login" component={Login} />
			</Route>
			<IndexRoute component={Home} />
			<Route path="/settings" component={Settings} />
		</Route>
	</Router>
);

ReactDOM.render(jsx, document.querySelector("#app"));