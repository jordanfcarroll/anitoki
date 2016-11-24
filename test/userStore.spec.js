var React = require("react");
var expect = require("chai").expect;
var spy = require("sinon").spy;
var spyOnComponentMethod = require("sinon-spy-react").spyOnComponentMethod;
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var userStore = require("../src/js/stores/userStore.js");

describe("userStore", () => {
	it("Should initialize with a null user", () => {
  userStore.logOut();

  const user = userStore.getUser();
  expect(user).to.equal(null);
  })

  it("isAuth should return false when no user is loaded", () => {
    const isAuth = userStore.isAuth();
    expect(isAuth).to.equal(false);
  })


  it("Should load user when logIn returns a user", () => {
    userStore.fake();
    const user = userStore.getUser();
    expect(user).to.eql({"name": "Rannah or Jordan", "pw":"123"});
  })

  it("Should have a null user after a logOut call", () => {
    userStore.fake();
    const user = userStore.getUser();
    expect(user).to.eql({"name": "Rannah or Jordan", "pw":"123"});
    userStore.logOut();
    expect(userStore.getUser()).to.equal(null);
  })
});
