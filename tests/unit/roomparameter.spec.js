var RoomParameterModel = require("../../models/roomParameter");
var chai = require("chai");

var expect = chai.expect;
var assert = chai.assert;

describe("Unit test - Room Parameter testing", function() {
    it("method getParameter", function(done) {

        RoomParameterModel
            .getParameter("527b6ccfea1522ab3331aea1", function (err, docs) {
                assert.equal(err, null);
                expect(docs).to.be.a("array");
                expect(docs[0].parameter_values).to.be.a("array");   // to check if it is correct or can be better
                done();
            });
    });

    it("method getParameters", function(done) {

        RoomParameterModel
            .getParameters( function (err, docs) {
                assert.equal(err, null);
                expect(docs).to.be.a("array");   // to check if it is correct or can be better
                done();
            });
    });
});