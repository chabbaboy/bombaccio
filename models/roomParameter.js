var mongoose = require('mongoose');
var database = require('../service/database');

var Schema = mongoose.Schema;

var RoomParameterSchema = new Schema({
    name: {type: String, required: false},
    system_name: {type: String, required: false},
    category_id: {type: Date, required: false},
    groups: {type: String, required: false},
    group_name: {type: String, required: false}
});

RoomParameterSchema.static("getParameter", function (id, callback) {

    var query = [
        {$match: {"_id": mongoose.Types.ObjectId(id)}},
        {
            $lookup: {
                from: "room_parameters_values",
                localField: "_id",
                foreignField: "pid",
                as: "parameter_values"
            }
        }
    ];

    this
        .aggregate(query)
        .exec(function (err, docs) {

            //aggregate function returns empty array if no results found
            if (docs.length !=0) {
                return callback(err, docs[0]);
            }
            else {
                return callback(err);
            }

        });
});

RoomParameterSchema.static("getParameters", function ( callback) {

    var query = [
        {
            $lookup: {
                from: "room_parameters_values",
                localField: "_id",
                foreignField: "pid",
                as: "parameter_values"
            }
        }
    ];

    this
        .aggregate(query)
        .exec(function (err, docs) {
            return callback(err, docs);
        });
});

var RoomParameter = database.model('room_parameters', RoomParameterSchema, 'room_parameters');

module.exports = RoomParameter;