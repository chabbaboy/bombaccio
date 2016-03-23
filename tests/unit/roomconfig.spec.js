var roomConfig = require('../../models/roomConfig');
var chai = require('chai');

var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;

before(function (done) {

    config = new roomConfig({

        user: "NinoTest",
        model: {
            "test-live-21-10-2014": [
                "Level 2",
                "Level 1"
            ]
        },
        date: "2014-10-21 13:14:14"
    });

    config.save(function (err) {
        if (err) {
            return done(err);
        }
        console.log("document inserted")
        return done();
    });
});

after(function (done) {

    roomConfig.findOne({user: "NinoTest"}).remove(function (err) {
        if (err) {
            return done(err);
        }
        console.log("document removed")
        return done();
    });
});

describe('TDD  Room Config', function () {

    it('should return the one unique room config based on a given username', function (done) {

        roomConfig.getConfig("NinoTest", function (err, docs) {

            assert.equal(err, null);
            assert.isObject(docs,'Result is an object')
            assert.isString(docs.user, 'user is a string');
            assert.typeOf(docs.model, 'object');
            assert.typeOf(docs.date, 'date');

            done();
        });
    });
    it('should return empty object based on not exististng username', function (done) {

        roomConfig.getConfig("NinoTestXXxxxXXXX", function (err, docs) {

            assert.equal(err, null);
            assert.isObject(docs,'Result is an object');

            done();
        });
    });

});
