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

    var id_mongo = mongoose.Types.ObjectId(id);
    var match_object = {"_id": id_mongo};
    var query = [
        {$match: match_object},
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