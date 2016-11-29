var React = require("react");
var expect = require("chai").expect;
var spy = require("sinon").spy;
var spyOnComponentMethod = require("sinon-spy-react").spyOnComponentMethod;
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var WeeklyView = require("../src/js/components/WeeklyView.jsx");
var Weekday = require("../src/js/components/Weekday.jsx");

describe("WeeklyView", () => {
	it("Should render seven weekday components", () => {
		const wrapper = shallow(<WeeklyView />);

		expect(wrapper.find("Weekday").length).to.equal(7);
	});

	it("Should render Sunday first", () => {
		const wrapper = mount(<WeeklyView />);
		const day = wrapper.find("Weekday").at(0);

		expect(day.prop("day")).to.equal("Sunday");
	})

	it("Should render Saturday last", () => {
		const wrapper = mount(<WeeklyView />);
		const day = wrapper.find("Weekday").at(6);

		expect(day.prop("day")).to.equal("Saturday");
	})
});
