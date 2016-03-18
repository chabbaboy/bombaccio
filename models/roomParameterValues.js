var mongoose = require('mongoose');
var database = require('../service/database');

var Schema = mongoose.Schema;

var objectIdValidator = function (id) {

    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (!checkForHexRegExp.test(id)) {
        return true;
    }

    return false;
};

var RoomParameterValuesSchema = new Schema({
    pid: {type: mongoose.Schema.Types.ObjectId, validate: {validator: objectIdValidator, msg: 'Not a ObjectId'}},
    value: {type: String, required: true},
    revit_value: {type: String, required: true}
});


RoomParameterValuesSchema.static("addparametervalue", function (pid, data, callback) {


    var newRoomParameterValue = new RoomParameterValues(data);
    newRoomParameterValue.pid = mongoose.Types.ObjectId(pid);

    newRoomParameterValue.save(function (err, roomValues) {

        return callback(err, roomValues);
    });

});

var RoomParameterValues = database.model('room_parameters_values', RoomParameterValuesSchema, 'room_parameters_values');

module.exports = RoomParameterValues;