var request = require("request");
var chai = require("chai");
var supertest = require("supertest");

// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
// http://webapplog.com/tdd/

var expect = chai.expect;

describe("testing parameter routes", function() {
    it("test parameters route", function(done) {

        var options = { method: 'GET',
            url: 'http://localhost:3000/api/parameters',
            headers:
            { 'postman-token': '8b2e7215-aee7-9f09-0193-e7b37ef98fea',
                'cache-control': 'no-cache' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            body = JSON.parse(body);

            expect(body).to.be.an("array");
            expect(body.length).to.be.greaterThan(5);

            done();
        });

    })
});