var express = require('express');
var RoomParameter = require('../models/roomParameter');

module.exports = function () {

    var router = express.Router();

    router.get('/parameter/:parameter', function (req, res) {

        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

        if (checkForHexRegExp.test(req.params.parameter)) {

            RoomParameter.getParameter(req.params.parameter, function (err, docs) {

                res.json(docs);
            })
        }
        else {
            res.json();
        }
    });

    router.get('/parameters', function (req, res) {

            RoomParameter.getParameters( function (err, docs) {

                res.json(docs);
            })

    });


    return router;
};