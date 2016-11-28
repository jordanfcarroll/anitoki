var React = require("react");
var expect = require("chai").expect;
var sinon = require("sinon");
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var Nav = require("../src/js/components/Nav.jsx");
var userStore = require("../src/js/stores/userStore.js");


describe("Nav", () => {
	it("Renders two links when no user is logged in", () => {
		userStore.logOut();

		const wrapper = shallow(<Nav/>);
		expect(wrapper.find("li").length).to.equal(2);
	})

	it("Renders three links when a user is logged in", () => {
		userStore.logOut();
		userStore.fake();

		const wrapper = shallow(<Nav/>);
		expect(wrapper.find("li").length).to.equal(3);
		userStore.logOut();
	})

	it("Renders three anchors when a user is logged in", () => {
		userStore.fake();

		const wrapper = mount(<Nav/>);
		expect(wrapper.find("a").length).to.equal(3);
		userStore.logOut();
	})

	// Should render anchor that links to home and login when not logged in

	// Should render anchors that link to home, settings, and logout when not logged in

});
