var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../server');

chai.use(chaiHttp);

var expect = chai.expect;

describe('Functional Testing - Room Config', function() {
    it('should list room config for specific user on /api/config/:user GET', function(done) {

        chai.request(server)
            .get('/api/config/Nino')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('model');
                res.body.model.should.be.Object;
                done();
            });

    });
    it('should return empty object for not existing user on /api/config/:user GET', function(done) {

        chai.request(server)
            .get('/api/config/Ninoxxx')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;

                done();
            });

    });
});