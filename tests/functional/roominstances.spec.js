var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../../server');

chai.use(chaiHttp);

var expect = chai.expect;

describe('Functional Testing - Room Instances', function() {
    it('should list room instances for specific user on /api/instances/:user GET', function(done) {

        chai.request(server)
            .get('/api/instances/101')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('Plan');
                res.body[0].should.have.property('model_id');
                res.body[0].should.have.property('room_instance_sync_date');
                res.body[0].should.have.property('room_model_sync_date');

                done();
            });
    });
    it('should return empty array for user who does not have room instances defined in room config', function(done) {

        chai.request(server)
            .get('/api/instances/Nino')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                expect(res.body).to.have.length(0);

                done();
            });
    });
});