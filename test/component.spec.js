// var expect = require("chai");
var expect = require("chai").expect;


describe('the environment', () => {

	it("knows about numbers", () => {
		expect(1).to.equal(1);
	})

	it('works, hopefully', () => {
		expect(true).to.be.true;
	});
});