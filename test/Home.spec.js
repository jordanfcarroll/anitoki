var React = require("react");
var expect = require("chai").expect;
var sinon = require("sinon");
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var Home = require("../src/js/components/Home.jsx");
var WeeklyView = require("../src/js/components/WeeklyView.jsx");
var Searchpane = require("../src/js/components/Searchpane.jsx");
var Showpane = require("../src/js/components/Showpane.jsx");
var userStore = require("../src/js/stores/userStore.js");


describe("Home", () => {
	it("Renders the <WeeklyView /> component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.containsMatchingElement(<WeeklyView />)).to.equal(true);
  });

	it("Renders the <Searchpane /> component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.containsMatchingElement(<Searchpane />)).to.equal(true);
  });

	it("Renders the <Showpane /> component", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.containsMatchingElement(<Showpane />)).to.equal(true);
  });
});
