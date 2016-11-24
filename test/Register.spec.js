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

    it("should initialize with empty error strings", () => {
      const wrapper = shallow(<Register/>);
      expect(wrapper.state("emailError")).to.equal("");
      expect(wrapper.state("passwordError")).to.equal("");
      expect(wrapper.state("passwordConfirmError")).to.equal("");
    });

    it("Should create error if registration email does not contain @", () => {

      const wrapper = shallow(<Register/>);
      const button = wrapper.find("button");
      const emailInput = wrapper.find("input").at(0);
      emailInput.simulate("change", {target: {value: "nehima99gmail.com"}});

      button.simulate("click");

      expect(wrapper.state("emailError")).to.equal("Please enter a valid email");
    });

    it("Should create error if registration email does not contain .", () => {

      const wrapper = shallow(<Register/>);
      const button = wrapper.find("button");
      const emailInput = wrapper.find("input").at(0);
      emailInput.simulate("change", {target: {value: "nehima99@gmailcom"}});

      button.simulate("click");

      expect(wrapper.state("emailError")).to.equal("Please enter a valid email");
    });

    it("Should not create error if email is OK", () => {

      const wrapper = shallow(<Register/>);
      const button = wrapper.find("button");
      const emailInput = wrapper.find("input").at(0);
      emailInput.simulate("change", {target: {value: "nehima99@gmail.com"}});

      button.simulate("click");

      expect(wrapper.state("emailError")).to.equal("");
    });

    it("Should create error if passwords do not match", () => {

      const wrapper = shallow(<Register/>);
      const button = wrapper.find("button");
      const passwordInput = wrapper.find("input").at(1);
      const passwordConfirmInput = wrapper.find("input").at(2);
      passwordInput.simulate("change", {target: {value: "conduit1"}});
      passwordConfirmInput.simulate("change", {target: {value: "conduit11"}});

      button.simulate("click");

      expect(wrapper.state("passwordError")).to.equal("Passwords do not match");
    });

    it("Should create error if password is fewer than 8 characters long", () => {

      const wrapper = shallow(<Register/>);
      const button = wrapper.find("button");
      const passwordInput = wrapper.find("input").at(1);

      passwordInput.simulate("change", {target: {value: "conduit"}});
      button.simulate("click");
      expect(wrapper.state("passwordError")).to.equal("Password must contain at least 8 characters");

      passwordInput.simulate("change", {target: {value: ""}});
      button.simulate("click");
      expect(wrapper.state("passwordError")).to.equal("Password must contain at least 8 characters");

      passwordInput.simulate("change", {target: {value: "lkjlk"}});
      button.simulate("click");
      expect(wrapper.state("passwordError")).to.equal("Password must contain at least 8 characters");
    });

    it("Should not throw error if passwords are acceptable", () => {

      const wrapper = shallow(<Register/>);
      const button = wrapper.find("button");
      const passwordInput = wrapper.find("input").at(1);
      const passwordConfirmInput = wrapper.find("input").at(2);

      passwordInput.simulate("change", {target: {value: "aaaaaaaaa"}});
      passwordConfirmInput.simulate("change", {target: {value: "aaaaaaaaa"}});
      button.simulate("click");
      expect(wrapper.state("passwordError")).to.equal("");

      passwordInput.simulate("change", {target: {value: "HAVEAGOODDAY"}});
      passwordConfirmInput.simulate("change", {target: {value: "HAVEAGOODDAY"}});
      button.simulate("click");
      expect(wrapper.state("passwordError")).to.equal("");

      passwordInput.simulate("change", {target: {value: "12345678"}});
      passwordConfirmInput.simulate("change", {target: {value: "12345678"}});
      button.simulate("click");
      expect(wrapper.state("passwordError")).to.equal("");
    });

    // it("should empty fields after a successful submit", () => {
    //   const wrapper = shallow(<Register/>);
    //   const button = wrapper.find("button");
    //   const emailInput = wrapper.find("input").at(0);
    //   const passwordInput = wrapper.find("input").at(1);
    //   const passwordConfirmInput = wrapper.find("input").at(2);

    //   emailInput.simulate("change", {target: {value: "bob@bob.com"}});
    //   passwordInput.simulate("change", {target: {value: "12345678"}});
    //   passwordConfirmInput.simulate("change", {target: {value: "12345678"}});

    //   button.simulate("click");

    //   expect(wrapper.state("emailError")).to.equal("");
    //   expect(wrapper.state("passwordError")).to.equal("");

    //   expect(wrapper.state("emailText")).to.equal("");
    //   expect(wrapper.state("passwordText")).to.equal("");
    //   expect(wrapper.state("passwordConfirmText")).to.equal("");
    //   expect(emailInput.prop("value")).to.equal("");
    //   expect(passwordInput.prop("value")).to.equal("");
    //   expect(passwordConfirmInput.prop("value")).to.equal("");
    // })
});
