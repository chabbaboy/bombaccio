var express = require('express');
var roomConfig = require('../models/roomConfig');
var RoomInstance = require('../models/RoomInstance');
var RoomModel = require('../models/RoomModel');

module.exports = function () {

    var router = express.Router();

    router.get('/config/:user', function (req, res) {

        roomConfig.getConfig(req.params.user, function (err, docs) {

            res.json(docs);
        })
    });

    router.get('/instances/:user', function (req, res) {

        RoomInstance.getInstance(req.params.user, function (err, docs) {

            res.json(docs);
        })
    });

    router.get('/models', function (req, res) {

        RoomModel.getModels( function (err, docs) {

            res.json(docs);
        })
    });


    return router;
};