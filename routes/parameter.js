var express = require('express');
var RoomParameter = require('../models/roomParameter');
var RoomParameterValues = require('../models/roomParameterValues');

module.exports = function () {

    var router = express.Router();

    router.get('/parameter/:parameter', function (req, res) {

        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

        if (!checkForHexRegExp.test(req.params.parameter)) {
            res.json();
        }

        RoomParameter.getParameter(req.params.parameter, function (err, docs) {

            res.json(docs);
        })

    });

    router.get('/parameters', function (req, res) {

        RoomParameter.getParameters(function (err, docs) {

            res.json(docs);
        })

    });

    router.post('/parametervalues/:parameter/add', function (req, res) {


        console.log(req.method);
        res.json(null);
        /*

        RoomParameterValues.addparametervalue(req.params.parameter,function (err, docs) {
            if (!err) {
                console.log('User saved!');
            }
            else {
                console.log(err);
            }

            res.json(docs);
        });
        */

    });


    return router;
};