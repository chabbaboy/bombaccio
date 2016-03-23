var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../server');

chai.use(chaiHttp);

var expect = chai.expect;

describe('Functional Testing - Room Parameters', function() {
    it("should list  all room parameters", function(done) {

        chai.request(server)
            .get('/api/parameters')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.array;
                done();
            });
    });
    it("should list  room parameter for specific parameter id", function(done) {

        chai.request(server)
            .get('/api/parameter/527b6ccfea1522ab3331aea1')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.object;

                done();
            });
    });
    it("should return empty object for not existing parameter id", function(done) {

        chai.request(server)
            .get('/api/parameter/5436526f4ba22247377f71a1')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.object;

                done();
            });
    });
    it("should return empty object for wrong format parameter id", function(done) {

        chai.request(server)
            .get('/api/parameter/5436526f4ba22241')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.object;

                done();
            });

    });
});