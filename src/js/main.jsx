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





