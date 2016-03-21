var express = require('express');
var RoomParameter = require('../models/roomParameter');

var RoomParameterValues = require('../models/roomParameterValues');

var objectIdValidator = function (id) {

    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    return checkForHexRegExp.test(id);
};

module.exports = function () {

    var router = express.Router();

    router.get('/parameter/:parameter', function (req, res) {

        if (!objectIdValidator(req.params.parameter)) {

            return res.json();
        }

        RoomParameter.getParameter(req.params.parameter, function (err, docs) {

            return res.json(docs);
        })

    });

    router.get('/parameters', function (req, res) {

        RoomParameter.getParameters(function (err, docs) {

            return res.json(docs);
        })

    });

    router.post('/parametervalues/:parameter/add', function (req, res) {

        RoomParameterValues.addparametervalue(req.params.parameter, req.body, function (err, docs) {

            if (err) {
                res.json({'ERROR': err});
            } else {
                res.json({'SUCCESS': docs});
            }
        });
    });

    router.delete('/parametervalues/:parameter', function (req, res) {

        RoomParameterValues.findById(req.params.parameter, function (err, parameter) {

            if (parameter) {
                if (err) {
                    res.json({'ERROR': err});
                } else {
                    parameter.remove(function (err) {
                        if (err) {
                            res.json({'ERROR': err});
                        } else {
                            res.json({'REMOVED': parameter});
                        }
                    });
                };

            }else{
               return  res.json(null);
            }
        });
    });


    return router;
};