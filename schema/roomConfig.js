var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomConfigSchema = new Schema({
    user: {type: String, required: false},
    model: Schema.Types.Mixed,
    date: {type: Date, required: false}
});

roomConfigSchema.static("getConfig", function (id, callback) {

    this
    .findOne({user: id})
    .exec(function (err, docs) {

        if (docs) {
            return callback(err, docs.toJSON());
        }
        else {
            return callback(err, {});
        }

    });
});

module.exports = roomConfigSchema;