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

	it("Search input should accept text", () => {
		const wrapper = mount(<Searchpane />);
		const input = wrapper.find("input");
		input.simulate("change", {target: {value: "Haikyuu"}});

		expect(wrapper.state("searchText")).to.equal("Haikyuu");
		expect(input.prop("value")).to.equal("Haikyuu");
	})

	it("Should filter displayed shows by English title based on search input", () => {
		const wrapper = mount(<Searchpane shows={[
			{
				title_romaji: "Haikyuu",
				title_japanese: "Haikyuu"
			},
			{
				title_romaji: "Dragonforce",
				title_japanese: "Dragonforce"
			},
			{
				title_romaji: "Dragonlance",
				title_japanese: "Dragonlance"
			},
			{
				title_romaji: "Nichijou",
				title_japanese: "Nichijou"
			}
				]} />);
		const input = wrapper.find("input");

		expect(wrapper.state("searchText")).to.equal("");
		expect(wrapper.prop("shows").length).to.equal(4);

		let results = wrapper.find("li");
		expect(results.length).to.equal(0);

		input.simulate("change", {target: {value: "Hai"}});
		expect(results.length).to.equal(1);

		input.simulate("change", {target: {value: "Drag"}});
		expect(results.length).to.equal(2);

		input.simulate("change", {target: {value: "Nichijour"}});
		expect(results.length).to.equal(0);

		input.simulate("change", {target: {value: "Dragonl"}});
		expect(results.length).to.equal(1);

	})
});
