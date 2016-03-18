var express = require('express');

var RoomModel = require('../models/roomModel');

module.exports = function () {

    var router = express.Router();



    router.get('/models', function (req, res) {

        RoomModel.getModels( function (err, docs) {

            res.json(docs);
        })
    });


    return router;
};