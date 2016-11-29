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

	it("Should render two buttons", () => {
		const wrapper = shallow(<Searchpane />);
		const button = wrapper.find("button");
		expect(button.length).to.equal(2);
	})

	it("Should empty search field on a Currently Airing click", () => {
		const wrapper = shallow(<Searchpane />);
		const button = wrapper.find("button").at(1);
		const input = wrapper.find("input");

		input.simulate("change", {target: {value: "aaaa"}});
		button.simulate("click");

		expect(wrapper.state("searchText")).to.equal("");
		expect(input.prop("value")).to.equal("");
	})

	it("Should display <WeeklyView /> ")

	it("Should display full airing schedule when search field is blank", () => {
		const fakeShows = [
			{
				title_romaji: "Haikyuu",
				title_english: "Haikyuu",
				id: 1,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Dragonforce",
				title_english: "Dragonforce",
				id: 2,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Dragonlance",
				title_english: "Dragonlance",
				id: 3,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Nichijou",
				title_english: "Nichijou",
				id: 4,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			}
				];
		const wrapper = mount(<Searchpane shows={fakeShows}/>);
		const input = wrapper.find("input");
		expect(input.prop("value")).to.equal("");

		const days = wrapper.find("Weekday");

		expect(days.length).to.equal(7);
	})

	it("Should filter displayed shows by English title based on search input", () => {
		userStore.fake();
		const fakeShows =  [
			{
				title_romaji: "Haikyuu",
				title_english: "Haikyuu",
				id: 1,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Dragonforce",
				title_english: "Dragonforce",
				id: 2,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Dragonlance",
				title_english: "Dragonlance",
				id: 3,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Nichijou",
				title_english: "Nichijou",
				id: 4,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			}
				];
		const wrapper = mount(<Searchpane shows={fakeShows} />);
		const input = wrapper.find("input");

		expect(wrapper.state("searchText")).to.equal("");
		expect(wrapper.prop("shows").length).to.equal(4);

		input.simulate("change", {target: {value: "Hai"}});
		let results = wrapper.find("li");
		expect(results.length).to.equal(1);

		input.simulate("change", {target: {value: "Drag"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(2);

		input.simulate("change", {target: {value: "Nichijour"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(0);

		input.simulate("change", {target: {value: "Dragonl"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(1);

	})

	it("Should filter displayed shows by Romaji title based on search input", () => {
		const fakeShows = [
			{
				title_romaji: "No go to walk",
				title_english: "Haikyuu",
				id: 1,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Doragofousu",
				title_english: "Dragonforce",
				id: 2,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Haikyuuuuu",
				title_english: "Dragonlance",
				id: 3,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Nichijou",
				title_english: "Nichijou",
				id: 4,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			}
				];
		const wrapper = mount(<Searchpane shows={fakeShows} />);
		const input = wrapper.find("input");

		expect(wrapper.state("searchText")).to.equal("");
		expect(wrapper.prop("shows").length).to.equal(4);


		input.simulate("change", {target: {value: "Haikyuu"}});
		let results = wrapper.find("li");
		expect(results.length).to.equal(2);

		input.simulate("change", {target: {value: "Dora"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(1);

		input.simulate("change", {target: {value: "Nichijour"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(0);

		input.simulate("change", {target: {value: "Nichijou"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(1);

	})

	it("Should search without regard to capital letters", () => {
		const fakeShows = [
			{
				title_romaji: "No go to walk",
				title_english: "Haikyuu",
				id: 1,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "DORAGOFOUSU",
				title_english: "Dragonforce",
				id: 2,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Haikyuuuuu",
				title_english: "Dragonlance",
				id: 3,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			},
			{
				title_romaji: "Nichijou",
				title_english: "Nichijou",
				id: 4,
				airing: {
					time: "2016-12-03T18:00:00+09:00"
				}
			}
				];
		const wrapper = mount(<Searchpane shows={fakeShows} />);
		const input = wrapper.find("input");

		expect(wrapper.state("searchText")).to.equal("");
		expect(wrapper.prop("shows").length).to.equal(4);

		let results = wrapper.find("li");

		input.simulate("change", {target: {value: "HAIKYUU"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(2);

		input.simulate("change", {target: {value: "dora"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(1);

		input.simulate("change", {target: {value: "nichijou"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(1);

		input.simulate("change", {target: {value: "doragofousu"}});
		results = wrapper.find("li");
		expect(results.length).to.equal(1);

	})

});
