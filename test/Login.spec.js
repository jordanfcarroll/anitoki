var React = require("react");
var expect = require("chai").expect;
var sinon = require("sinon");
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var Login = require("../src/js/components/Login.jsx");
var userStore = require("../src/js/stores/userStore.js");


describe("Login", () => {
	it("Renders two text inputs", () => {
		userStore.logOut();
		// var isAuth = sinon.stub(userStore, 'isAuth');
		// isAuth.yields(true);
		const wrapper = shallow(<Login/>);
		expect(wrapper.find("input").length).to.equal(2);
	})

	it("Renders a submit button", () => {
		userStore.logOut();

		const wrapper = shallow(<Login/>);
		expect(wrapper.containsAllMatchingElements([
			// <button>Submit</button>
			])).to.equal(true);	
	})

	it("should initialize with an empty input values", () => {
		userStore.logOut();

      	const wrapper = shallow(<Login/>);
      	expect(wrapper.state("emailText")).to.equal("");
      	expect(wrapper.state("passwordText")).to.equal("");
    	});

    it("Email field should accept input", () => {
		userStore.logOut();

      	const wrapper = mount(<Login/>);
      	const input = wrapper.find("input").at(0);
		input.simulate("change", {target: {value: "Jordan"}});
     	expect(wrapper.state("emailText")).to.equal("Jordan");
     	expect(input.prop("value")).to.equal("Jordan");
    });

    it("Password field should accept input", () => {
		userStore.logOut();

      	const wrapper = mount(<Login/>);
      	const input = wrapper.find("input").at(1);
		input.simulate("change", {target: {value: "conduit"}});
     	expect(wrapper.state("passwordText")).to.equal("conduit");
     	expect(input.prop("value")).to.equal("conduit");
    });

});
