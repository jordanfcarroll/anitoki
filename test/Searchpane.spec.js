var React = require("react");
var expect = require("chai").expect;
var sinon = require("sinon");
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var Searchpane = require("../src/js/components/Searchpane.jsx");
var userStore = require("../src/js/stores/userStore.js");


describe("Searchpane", () => {
	it("Renders a search input", () => {
    const wrapper = shallow(<Searchpane />);
    expect(wrapper.containsMatchingElement(<input />)).to.equal(true);
  });

});
