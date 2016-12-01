var React = require("react");
var expect = require("chai").expect;
var spy = require("sinon").spy;
var spyOnComponentMethod = require("sinon-spy-react").spyOnComponentMethod;
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var userStore = require("../src/js/stores/userStore.js");

describe("userStore", () => {
	it("Should initialize with a pseudo user", () => {
  userStore.logOut();

  const user = userStore.getUser();
  expect(user.email).to.equal(null);
  })

  it("Should load user when logIn returns a user", () => {
    userStore.logIn("nehima99@gmail.com", "conduit1");

    const user = userStore.getUser();
    expect(user).to.eql({"name": "nehima99@gmail.com", "pw":"conduit1", tracking: [user.tracking], settings: [user.settings]});
  })

  it("Should have a null user email after a logOut call", () => {
    const user = userStore.getUser();
    expect(user).to.eql({"name": "Rannah or Jordan", "pw":"123", tracking: [], settings: []});
    userStore.logOut();
    expect(userStore.getUser().email).to.equal(null);
  })

  it("Should add a show's id to the current user on track call", () => {
    userStore.logOut();

    userStore.track(123);

    userStore.on("update", function () {
      expect(userStore.getUser().tracking.indexOf(123)).to.equal(0);
      expect(userStore.getUser().tracking.indexOf(124)).to.equal(-1);
    })
  })
});
