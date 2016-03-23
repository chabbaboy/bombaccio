var mongoose = require('mongoose');
var database = require('../service/database');
var roomConfigSchema = require("../schema/roomConfig");

var RoomConfig = database.model('room_config', roomConfigSchema, 'room_config');
module.exports = RoomConfig;