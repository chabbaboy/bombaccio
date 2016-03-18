var ConfigModel = require("../../models/roomConfig");
var chai = require("chai");

var expect = chai.expect;
var assert = chai.assert;

describe("test config", function() {
    it("getConfig", function(done) {

        ConfigModel
            .getConfig("101", function (err, docs) {
                assert.equal(err, null);
                expect(docs).to.be.a("object");
                expect(docs.hasOwnProperty("list")).to.be.eq(true);
                done();
            });
    })
});