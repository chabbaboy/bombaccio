var mongoose = require('mongoose');
var database = require('../service/database');
var roomConfig = require('../models/roomConfig');

var Schema = mongoose.Schema;

var RoomInstanceSchema = new Schema({
    Rumsnamn: {type: String, required: false},
    Rumsnummerrr: {type: String, required: false},
    model_id: {type: String, required: false},
    sync_date: {type: Date, required: false}
});


function getObjectFromModel(data) {

    if (data.model) {

        var lv_model = data.model;
        var model_keys = Object.keys(data.model);

        var lv_match = "{ $or: [";

        model_keys.forEach(function (model_id) {

            lv_match = lv_match + '{ "model_id": "' + model_id + '", ' + '"Plan": {$in:[';

            for (i = 0; i < lv_model[model_id].length; i++) {
                if ((i + 1) < lv_model[model_id].length) {
                    lv_match = lv_match + '"' + lv_model[model_id][i] + '",';
                }
                else//zadnji elemenat niza bez zareza na kraju
                {
                    lv_match = lv_match + '"' + lv_model[model_id][i] + '"';
                }
            }
            lv_match = lv_match + ']}},';

        });

        lv_match = lv_match + ']}';

        return eval("(" + lv_match + ')');
    }
    else {
        return null;
    }
};

function transformModelObjectToMatch(data) {

    var or = [];

    if (data) {

        Object.keys(data.model).forEach(function (item, index, array) {

            or.push({"model_id": item, "Plan": {'$in': data.model[item]}});

        });
    }
    var res = {'$or': or};

    return res;
}


// get active Room Instances  for userss
RoomInstanceSchema.static("getInstance", function (id, callback) {

    var roomInstance = this;

    roomConfig.getConfig(id, function (err, data) {

        var matchObject = transformModelObjectToMatch(data);

        var query = [
            {
                $match: matchObject
            },
            {
                $lookup: {
                    from: "room_models",
                    localField: "model_id",
                    foreignField: "model_id",
                    as: "room_model"
                }
            },
            {
                $project: {
                    "_id": 0,
                    "Rumsnamn": 1,
                    "Rumsnummerrr": 1,
                    "Plan": 1,
                    "model_id": 1,
                    "Kort Beskrivning Målning": 1,
                    "room_instance_sync_date": "$sync_date",
                    "room_model_sync_date": "$room_model.sync_date"
                }
            },
            {"$unwind": "$room_model_sync_date"},
            {
                $project: {
                    "Rumsnamn": 1,
                    "Rumsnummerrr": 1,
                    "model_id": 1,
                    "Plan": 1,
                    "room_instance_sync_date": 1,
                    "room_model_sync_date": 1,
                    eq: {$cond: [{$gte: ["$room_instance_sync_date", "$room_model_sync_date"]}, 1, 0]}
                }
            },
            {$match: {eq: 1}}

        ];

        roomInstance
            .aggregate(query)
            .exec(function (err, docs) {

                return callback(err, docs);
            });
    });

});

var RoomInstance = database.model('room_instance', RoomInstanceSchema, 'room_instances');

module.exports = RoomInstance;