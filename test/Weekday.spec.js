var React = require("react");
var expect = require("chai").expect;
var spy = require("sinon").spy;
var spyOnComponentMethod = require("sinon-spy-react").spyOnComponentMethod;
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var Weekday = require("../src/js/components/Weekday.jsx");

describe("Weekday", () => {
	it("Should render no <Show /> components if there are none passed as props", () => {
		const wrapper = shallow(<Weekday shows={ [] } />);
		const shows = wrapper.find("Show");

		expect(shows.length).to.equal(0);	
	})

	it("Should render a <Show /> component for each show in props", () => {
		const wrapper = shallow(<Weekday shows={ [{key:"1"},{key:"2"},{key:"3"}] }/>);
		const shows = wrapper.find("Show");

		expect(shows.length).to.equal(3);
	})

	it("Should pass airtimeDisplay? prop to children")
});
