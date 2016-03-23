var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../server');

chai.use(chaiHttp);

var expect = chai.expect;

describe('Functional Testing - Models', function() {
    it('should list ALL room models  on /api/models GET', function(done) {

        chai.request(server)
            .get('/api/models')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });

    });
});