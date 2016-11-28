var React = require("react");
var expect = require("chai").expect;
var spy = require("sinon").spy;
var spyOnComponentMethod = require("sinon-spy-react").spyOnComponentMethod;
var shallow = require("enzyme").shallow;
var mount = require("enzyme").mount;

var showStore = require("../src/js/stores/showStore.js");

describe("showStore", () => {
	it("Should initialize with an empty array of shows", () => {
    var shows = showStore.getShows();
    expect(shows).to.eql([]);
  });
});
