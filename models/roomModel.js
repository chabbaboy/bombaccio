var mongoose = require('mongoose');
var database = require('../service/database');
var roomInstance = require('../models/roomInstance');

var Schema = mongoose.Schema;

var RoomModelSchema = new Schema({
    model_id: {type: String, required: false},
    model_name: {type: String, required: false},
    sync_date: {type: Date, required: false},
    group_id: {type: String, required: false}
});

RoomModelSchema.static("getModels", function (callback) {

    var query = [
        {
            $group: {
                "_id": {model_name: "$model_id"},
                "Plan": {$addToSet: "$Plan"},
                "room_instances": {$sum: 1}
            }
        },
        {
            $lookup: {
                from: "room_models",
                localField: "_id.model_id",
                foreignField: "model_id",
                as: "model_name"
            }
        },
        {
            $project: {
                _id: 0, model_name: "$_id.model_name", Plan: "$Plan", count: "$room_instances"
            }
        },
        {$sort: {model_name: 1, Plan: 1}}
    ];

    roomInstance
        .aggregate(query)
        .exec(function (err, docs) {
            return callback(err, docs);
        });
});

var RoomModel = database.model('room_model', RoomModelSchema, 'room_models');

module.exports = RoomModel;