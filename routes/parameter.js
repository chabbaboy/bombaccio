var express = require('express');
var RoomParameter = require('../models/roomParameter');
var RoomParameterValues = require('../models/roomParameterValues');

var objectIdValidator = function (id) {

    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    if (checkForHexRegExp.test(id)) {
        return true;
    }

    return false;
};

module.exports = function () {

    var router = express.Router();

    router.get('/parameter/:parameter', function (req, res) {

        console.log(objectIdValidator(req.params.parameter));

        if (!objectIdValidator(req.params.parameter)) {
            console.log("paramatera nije dobar ");
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

        RoomParameterValues.addparametervalue(req.params.parameter,req.body,function (err, docs) {
            if (!err) {
                console.log('Parameter saved!');
            }
            else {
                console.log(err);
            }

            res.json(docs);
        });


    });


    return router;
};