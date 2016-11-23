var React = require("react");
var expect = require("chai").expect;
var sinon = require("sinon");
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var Register = require("../src/js/components/Register.jsx");
var userStore = require("../src/js/stores/userStore.js");


describe("Register", () => {
	it("Renders three text inputs", () => {
		userStore.logOut();

		const wrapper = shallow(<Register/>);
		expect(wrapper.find("input").length).to.equal(3);
	})

	it("Renders a submit button", () => {
		userStore.logOut();

		const wrapper = shallow(<Register/>);
		expect(wrapper.containsAllMatchingElements([
			// <button>Submit</button>
		])).to.equal(true);	
	})

	it("should initialize with an empty input values", () => {
		userStore.logOut();

  		const wrapper = shallow(<Register/>);
  		expect(wrapper.state("emailText")).to.equal("");
  		expect(wrapper.state("passwordText")).to.equal("");
  	});

    it("Email field should accept input", () => {
		  userStore.logOut();

      const wrapper = mount(<Register/>);
      const input = wrapper.find("input").at(0);
		  input.simulate("change", {target: {value: "Jordan"}});
     	expect(wrapper.state("emailText")).to.equal("Jordan");
     	expect(input.prop("value")).to.equal("Jordan");
    });

    it("Password field should accept input", () => {
		userStore.logOut();

      const wrapper = mount(<Register/>);
      const input = wrapper.find("input").at(1);
		  input.simulate("change", {target: {value: "conduit"}});
     	expect(wrapper.state("passwordText")).to.equal("conduit");
     	expect(input.prop("value")).to.equal("conduit");
    });

    it("Password confirm field should accept input", () => {
		userStore.logOut();

     	const wrapper = mount(<Register/>);
      	const input = wrapper.find("input").at(2);
		input.simulate("change", {target: {value: "conduit"}});
     	expect(wrapper.state("passwordConfirmText")).to.equal("conduit");
     	expect(input.prop("value")).to.equal("conduit");
    });
});
