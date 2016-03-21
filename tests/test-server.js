var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Parameters', function () {
    it('should list ALL parameters on /api/parameters GET', function (done) {
        chai.request(server)
            .get('/api/parameters')
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                done();
            });
    });

    it('should add a SINGLE parameter valie on /api/parametervalues/:parameter/add POST', function (done) {
        chai.request(server)
            .post('/api/parametervalues/5414330dea15221b0a818eb8/add')
            .send({"value": "TestValue", "revit_value": "TestValue"})
            .end(function (err,res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('SUCCESS');
                res.body.SUCCESS.should.have.property('value');
                res.body.SUCCESS.should.have.property('revit_value');
                res.body.SUCCESS.value.should.equal('TestValue');
                res.body.SUCCESS.revit_value.should.equal('TestValue');
                done();
            });
    });



/*
    it('should list a SINGLE blob on /blob/<id> GET');

    it('should update a SINGLE blob on /blob/<id> PUT');
    it('should delete a SINGLE blob on /blob/<id> DELETE');
    */
});