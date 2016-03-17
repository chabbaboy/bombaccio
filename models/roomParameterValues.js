var mongoose = require('mongoose');
var database = require('../service/database');

var Schema = mongoose.Schema;

var RoomParameterValuesSchema = new Schema({
    _id:            {type:  Types.ObjectId},
    pid:            {type:  Types.ObjectId},
    value:          {type: String, required: false},
    revit_value:    {type: Date, required: false}
});

RoomParameterValuesSchema.static("getParameterValues", function (id,callback) {

});

var RoomParameterValues = database.model('room_parameters_values', RoomParameterValuesSchema, 'room_parameters_values');

module.exports = RoomParameterValues;