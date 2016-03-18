var mongoose = require('mongoose');
var database = require('../service/database');

var Schema = mongoose.Schema;

var RoomParameterValuesSchema = new Schema({
    pid: mongoose.Schema.Types.ObjectId,
    value: {type: String, required: false},
    revit_value: {type: Date, required: false}
});

RoomParameterValuesSchema.static("addparametervalue", function (data, callback) {

    var newRoomParameterValue = new RoomParameterValues(data);

    newRoomParameterValue.pid = mongoose.Types.ObjectId(pid);

    newRoomParameterValue.save(function (err, roomValues) {

        return callback(err, roomValues);
    });
});

var RoomParameterValues = database.model('room_parameters_values', RoomParameterValuesSchema, 'room_parameters_values');

module.exports = RoomParameterValues;