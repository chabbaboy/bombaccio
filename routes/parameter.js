var express = require('express');
var RoomParameter = require('../models/roomParameter');

module.exports = function () {

    var router = express.Router();

    router.get('/parameter/:parameter', function (req, res) {

        RoomParameter.getParameter(req.params.parameter, function (err, docs) {

            res.json(docs);
        })
    });


    return router;
};