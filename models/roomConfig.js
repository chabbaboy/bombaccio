var mongoose = require('mongoose');
var database = require('../service/database');

var Schema = mongoose.Schema;

var RoomConfigSchema = new Schema({
    user: {type: String, required: false},
    model: Schema.Types.Mixed,
    date: {type: Date, required: false}
});

RoomConfigSchema.static("getConfig", function (id, callback) {

    this
        .findOne({user: id})
        .exec(function (err, docs) {

            if (docs) {
                return callback(err, docs.toJSON());
            }
            else {
                return callback(err, null);
            }
        });
});

var RoomConfig = database.model('room_config', RoomConfigSchema, 'room_config');

module.exports = RoomConfig;