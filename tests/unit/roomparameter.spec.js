var roomParameterModel = require("../../models/roomParameter");
var chai = require("chai");

var expect = chai.expect;
var assert = chai.assert;


before(function (done) {

    roomParameter = new roomParameterModel({
            "name": "NinoRoomParameter",
            "system_name": "Design Option",
            "is_unique": "0",
            "is_different": "0",
            "is_editable": "1",
            "is_system": "0",
            "can_copy": "0",
            "sync_till_revit": "0",
            "parameter_type": "1",
            "datatyp": "0",
            "create_in_revit": "0",
            "create_date": "2013-11-15 15:54:37",
            "update_date": "2014-07-08 16:31:40",
            "category_id": [
                "-2000160"
            ],
            "sync_fran_revit": 0,
            "groups": [
                "54e5e29c4ba2223915f5fb4a"
            ],
            "group_name": "Övriga system parametrar"
        }
    );

    roomParameter.save(function (err) {
        if (err) {
            return done(err);
        }
        console.log("document inserted")
        return done();
    });
});

after(function (done) {

    roomParameterModel.findOne({name: "NinoRoomParameter"}).remove(function (err) {
        if (err) {
            return done(err);
        }
        console.log("document removed")
        return done();
    });
});

describe("TDD  Room Parameter", function () {

    it("should return the one unique room parameter object based on a given name", function (done) {

        roomParameterModel.findOne({name: "NinoRoomParameter"}, function (err, data) {

            roomParameterModel
                .getParameter(data._id, function (err, docs) {

                    assert.equal(err, null);
                    assert.isObject(docs, 'Result is an object')
                    assert.isArray(docs.parameter_values, 'parameter_values is an Array');

                    done();
                });


        });

    });

    it("should return undefined based on not existing a given name", function (done) {

        roomParameterModel
                .getParameter("542134684ba222eb63be6418", function (err, docs) {

                    assert.equal(err, null);
                    assert.isUndefined(docs,'result is not defined');

                    done();
                });
    });

    it("should return all room parameters object", function (done) {

        roomParameterModel
            .getParameters(function (err, docs) {
                assert.equal(err, null);
                assert.isDefined(docs,'result is  defined');
                assert.isArray(docs,'result is  an Array');
                done();
            });
    });
});