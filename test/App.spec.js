var React = require("react");
var expect = require("chai").expect;
var spy = require("sinon").spy;
var spyOnComponentMethod = require("sinon-spy-react").spyOnComponentMethod;
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var App = require("../src/js/components/App.jsx");
var Nav = require("../src/js/components/Nav.jsx");
var Home = require("../src/js/components/Home.jsx");
var Landing = require("../src/js/components/Landing.jsx");

describe("App", () => {
	it("Renders the <Nav /> compenent", () => {
		const wrapper = shallow(<App/>);
		expect(wrapper.containsAllMatchingElements([
			<Nav/>
		])).to.equal(true);
	});

	// Should redirect to login when !isAuth
});
