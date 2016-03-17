var express = require('express');

var RoomModel = require('../models/RoomModel');

module.exports = function () {

    var router = express.Router();



    router.get('/models', function (req, res) {

        RoomModel.getModels( function (err, docs) {

            res.json(docs);
        })
    });


    return router;
};