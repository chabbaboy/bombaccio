var mongoose_1 = require("mongoose");
var mockgoose = require("mockgoose");
var mongoose = new mongoose_1.Mongoose();
mockgoose(mongoose);

var roomConfigSchema = require("../schema/roomConfig");
var configModel = mongoose.model("config_model", roomConfigSchema);

var chai = require("chai");
var expect = chai.expect;

var fakeConfig = {
    user: "NinoTest",
    model: {
        "test-live-21-10-2014": [
            "Level 2",
            "Level 1"
        ]
    },
    date: "2014-10-21 13:14:14"
}

describe('room Config', function () {
    before(function (done) {
        mongoose.connect('mongodb://dummy', function (err) {
            done(err);
        });
    });
    it("isMocked", function (done) {
        expect(mongoose.isMocked).to.be.eq(true);
        done();
    });
    it("try to create room config", function (done) {

        config = new configModel(fakeConfig);
        config.save(function (err, res) {
            done();
        });
    });

    it("try to get room config for specific user", function (done) {
        configModel.getConfig(fakeConfig.user, function (err, data) {
            console.log("rezultat f.je:")
            console.log(data)
            expect(data).to.be.an("object");
            expect(data).to.hasOwnProperty("user");
            expect(data).to.hasOwnProperty("model");
            expect(data).to.hasOwnProperty("date");
            expect(data.model).to.be.an("object");
            done();
        });

    });


    it("remove user", function (done) {
        configModel.remove({user: fakeConfig.user}, function (res) {
            expect(res).to.be.a("null");
            done();
        });
    });
});