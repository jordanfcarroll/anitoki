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
    userStore.fake();
    const wrapper = shallow(<Home />);
    expect(wrapper.containsMatchingElement(<WeeklyView />)).to.equal(true);
  });

  it("Renders the <Showpane /> component", () => {
    userStore.fake();
    const wrapper = shallow(<Home />);
    expect(wrapper.containsMatchingElement(<Showpane />)).to.equal(true);
  });

  if ("Does not render the <Searchpane /> component without data", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.containsMatchingElement(<Searchpane />)).to.equal(false);
  })

  it("Renders the <Searchpane /> component when data is present", () => {
    userStore.fake();
    const wrapper = shallow(<Home />);
    wrapper.setState({ shows: 1 });
    expect(wrapper.containsMatchingElement(<Searchpane />)).to.equal(true);
  });
});
